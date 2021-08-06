import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class DeviceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.DeviceCreateInput): Promise<import(".prisma/client").Device>;
    getAll(data: Prisma.DeviceFindManyArgs): Promise<(import(".prisma/client").Device & {})[]>;
}
