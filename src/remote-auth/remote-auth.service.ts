import { ForbiddenException, Injectable } from '@nestjs/common';
import { DeviceType, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretService } from 'src/secret/secret.service';
import * as bcrypt from 'bcrypt';
import { SessionTokenService } from 'src/session-token/session-token.service';

@Injectable()
export class RemoteAuthService {
    constructor(private prisma: PrismaService, private secret: SecretService, private sessionToken: SessionTokenService) {}

    async start(deviceName: string, deviceType: DeviceType, rsaKey: string) {
        const secret = this.secret.generateHex(512);

        const { id } = await this.prisma.authentication.create({
            data: {
                deviceName,
                deviceType,
                rsaKey,
                secret: await bcrypt.hash(secret, 10),
            },
        });

        return {
            id,
            secret,
        };
    }

    async scan(user: User, id: string) {
        return await this.prisma.authentication.update({
            where: {
                id, 
            },
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    }

    async send(id: string, keyExchanges: ({ safeid: string; value: string })[]) {
        const auth = await this.prisma.authentication.findUnique({
            where: {
                id,
            },
        });
        
        const {device} = await this.prisma.authentication.update({
            where: {
                id,
            },
            data: {
                device: {
                    create: {
                        name: auth.deviceName,
                        type: auth.deviceType,
                        rsaKey: auth.rsaKey,
                        user: {
                            connect: {
                                id: auth.userId,
                            },
                        },
                    },
                },
            },
            include: {
                device: true,
            },
        })

        await Promise.all(
            keyExchanges.map(
                async (key) => {
                    await this.prisma.keyExchange.create({
                        data: {
                            device: {
                                connect: {
                                    id: device.id
                                },
                            },
                            safe: {
                                connect: {
                                    id: key.safeid,
                                },
                            },
                            value: key.value,
                        },
                    })
                }
            )
        )
    }

    async check(id: string, secret: string) {
        const auth = await this.prisma.authentication.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    include: {
                        icon: true,
                    },
                },
                device: true,
            }
        });

        if(!auth || !(await bcrypt.compare(secret, auth.secret))) throw new ForbiddenException();
    
        if(!auth.user) {
            return {
                message: "remote_auth_not_scanned",
            };
        } else if(auth.user && !auth.device) {
            return {
                message: "remote_auth_scanned",
                user: {
                    username: auth.user.username,
                    email: auth.user.email,
                    icon: auth.user.icon,
                },
            };
        } else {
            const sessionToken = await this.sessionToken.create(auth.device);

            return {
                message: "remote_auth_success",
                sessionToken,
                user: {
                    username: auth.user.username,
                    email: auth.user.email,
                    icon: auth.user.icon,
                },
            };
        }
    }
}
