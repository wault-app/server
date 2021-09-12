import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { DeviceType, Device, User } from '@prisma/client';
import { SecretService } from 'src/secret/secret.service';
import { RegisterDTO } from 'src/dto/RegisterDTO';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { AccessTokenType } from '@wault/typings';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private mail: MailService,
        private secret: SecretService,
        private jwt: JwtService,
        private refresh: RefreshTokenService,
    ) {}
    
    /**
     * Validates if there is an account with the associated email address and if the password matches the email.
     * @param email {string} email address of the user
     * @param password {string} a pbkdf2 encrypted version of the password
     * @throws {UnauthorizedException} if there is no user with this email or if password does not matches
     * @returns {User} user object
     */
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException();

        return user;
    }

    /**
     * Generates a new access token as a jwt signed string for a given device.
     * @param device {Device} the device, that we want to use 
     * @returns {string} a jwt string
     */
    private generateAccessToken(device: Device & { user: User }) {
        const data: AccessTokenType = {
            sub: device.userId,
            device: device.id,
            username: device.user.username,
            email: device.user.email,
        };
        
        return this.jwt.sign(data);
    }

    /**
     * Takes an old refresh token and generates a new access and refresh token.
     * @param oldRefreshToken {string} old refresh token as a string
     * @returns an object containing the access and refresh token
     */
    async refreshToken(oldRefreshToken: string) {
        const { refreshToken, device } = await this.refresh.refresh(oldRefreshToken); 
        const accessToken = await this.generateAccessToken(device);

        return {
            accessToken,
            refreshToken,
            device,
        };
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
        const device = await this.prisma.device.create({
            data: {
                user: {
                    create: {
                        username: confirmation.username,
                        email: confirmation.email,
                        password: confirmation.password,
                        privateKey: confirmation.privateKey,
                        publicKey: confirmation.publicKey,
                    },
                },
                name: confirmation.deviceName,
                type: confirmation.deviceType,
            },
            include: {
                user: true,
            },
        });

        // generate session token for the device
        const accessToken = await this.generateAccessToken(device);

        const { refreshToken } = await this.refresh.create(device);

        return {
            accessToken,
            refreshToken,
            device,
        };
    }

    async login(email: string, password: string, deviceName: string, deviceType: DeviceType) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user || !(await bcrypt.compare(password, user.password))) throw new ForbiddenException();

        // create the device
        const device = await this.prisma.device.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                name: deviceName,
                type: deviceType,
            },
            include: {
                user: true,
            },
        });

        // generate session token for the device
        const accessToken = await this.generateAccessToken(device);

        // generate a refresh token
        const { refreshToken } = await this.refresh.create(device);

        return {
            accessToken,
            refreshToken,
            rsa: {
                publicKey: user.publicKey,
                privateKey: user.privateKey,
            },
        };
    }

    async sendVerificationEmail({ username, email, password, deviceType, deviceName, rsa }: RegisterDTO) {
        // generate a random hex string to verify indentity
        const secret = this.secret.generateHex(128);

        // create a new email confirmation object inside database
        const { id } = await this.prisma.emailConfirmation.create({
            data: {
                secret: await bcrypt.hash(secret, 10),
                email,
                username,
                password: await bcrypt.hash(password, 10),
                deviceType,
                deviceName,
                publicKey: rsa.publicKey,
                privateKey: rsa.privateKey,
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
