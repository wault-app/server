import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { DeviceType } from '@prisma/client';
import { SecretService } from 'src/secret/secret.service';
import { DeviceService } from 'src/device/device.service';
import { SessionTokenService } from 'src/session-token/session-token.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private mail: MailService,
        private secret: SecretService,
        private device: DeviceService,
        private sessionToken: SessionTokenService,
    ) {}

    async validateUser(sessionToken: string) {
        // extract data from session token
        const { id, secret } = JSON.parse(Buffer.from(sessionToken, "base64").toString("utf-8"));
    
        // find the device with the given id
        const device = await this.prisma.device.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });

        // check for session token match
        if(!device || !(await bcrypt.compare(secret, device.sessionToken))) throw new UnauthorizedException();
    
        // return the user object
        return device.user;
    }

    async verifyEmail(id: string, secret: string) {
        // find email confirmation object inside database
        const confirmation = await this.prisma.emailConfirmation.findUnique({
            where: {
                id,
            },
        });

        // check if provided secret matches the one inside the db
        if(!confirmation || !(await bcrypt.compare(secret, confirmation.secret))) throw new ForbiddenException();
        
        // delete object as we won't need it from now 
        await this.prisma.emailConfirmation.delete({
            where: {
                id,
            },
        });

        // create the device
        const device = await this.device.create({
            user: {
                create: {
                    username: confirmation.username,
                    email: confirmation.email,
                },
            },
            name: confirmation.deviceName,
            type: confirmation.deviceType,
            rsaKey: confirmation.rsaKey,
        });

        // generate session token for the device
        const sessionToken = await this.sessionToken.create(device);

        return {
            sessionToken,
        };
    }

    async sendVerificationEmail(username: string, email: string, deviceType: DeviceType, deviceName: string, rsaKey: string) {
        // generate a random hex string to verify indentity
        const secret = this.secret.generateHex(128);

        // create a new email confirmation object inside database
        const { id } = await this.prisma.emailConfirmation.create({
            data: {
                secret: await bcrypt.hash(secret, 10),
                email,
                username,
                deviceType,
                deviceName,
                rsaKey,
            },
        });

        // send the email to the user
        await this.mail.send({
            to: email,
            from: "Wault <noreply@wault.app>", // sender of the email (change it for self-host)
            templateId: "d-df88e2e7c5d14b69b50dd517220f78cd", // template id created by SendGrid (create your own for self-host)
            dynamicTemplateData: {
                id,
                secret,
                username,
            },
        });
    }
}
