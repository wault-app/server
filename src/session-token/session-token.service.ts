import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SecretService } from 'src/secret/secret.service';

@Injectable()
export class SessionTokenService {
    constructor(private secret: SecretService, private prisma: PrismaService) {}
    
    async create(device: Device) {        
        const { user } = await this.prisma.device.findUnique({
            where: {
                id: device.id,
            },
            include: {
                user: true,
            },
        });

        const secret = await this.secret.generateHex(512);

        const sessionToken = Buffer.from(
            JSON.stringify(
                {
                    id: user.id,
                    secret, // this functions as a password for our session token
                    username: user.username,
                    email: user.email,
                    device: {
                        id: device.id,
                        name: device.name,
                        type: device.type,
                        rsaKey: device.rsaKey,
                    },
                }
            )
        ).toString("base64");

        await this.prisma.device.update({
            where: {
                id: device.id,
            },
            data: {
                sessionToken: await bcrypt.hash(sessionToken, 10),
            },
        });

        return sessionToken;
    }
}
