import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUser(user: User) {
        return await this.prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                publicKey: true,
                privateKey: true,
                icon: {
                    select: {
                        id: true,
                        type: true,
                        value: true,
                    },
                },
            }
        });
    }
}
