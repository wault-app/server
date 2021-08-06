import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ItemService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ItemCreateInput): Promise<import(".prisma/client").Item>;
    update(data: Prisma.ItemUpdateArgs): Promise<import(".prisma/client").Item>;
    delete(data: Prisma.ItemDeleteArgs): Promise<import(".prisma/client").Item>;
}
