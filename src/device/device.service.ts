import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) {} 
    
    async getAll(data: Prisma.DeviceFindManyArgs) {
        return await this.prisma.device.findMany({
            ...data,
            select: {
                id: true,
                name: true,
                type: true,
                loggedInAt: true,
            },
        });
    }
}
