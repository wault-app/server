import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) {} 

    async create(data: Prisma.DeviceCreateInput) {
        return await this.prisma.device.create({
            data,
        });
    }

    async getAll(data: Prisma.DeviceFindManyArgs) {
        return await this.prisma.device.findMany({
            ...data,
            select: {
                id: true,
                rsaKey: true,
                name: true,
                type: true,
                loggedInAt: true,
            },
        });
    }
}