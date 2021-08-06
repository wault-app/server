import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class KeyExchangeService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(data: Prisma.KeyExchangeFindManyArgs): Promise<(import(".prisma/client").KeyExchange & {})[]>;
    create(data: Prisma.KeyExchangeCreateInput): Promise<import(".prisma/client").KeyExchange>;
}
