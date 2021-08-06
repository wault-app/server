import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const select: Prisma.KeyExchangeSelect = {
    id: true,
    safe: {
        select: {
            id: true,
        },
    },
    value: true,
};

@Injectable()
export class KeyExchangeService {
    constructor(private prisma: PrismaService) {}
    
    async getAll(data: Prisma.KeyExchangeFindManyArgs) {
        return await this.prisma.keyExchange.findMany({
            select,
            ...data,
        });
    }

    async create(data: Prisma.KeyExchangeCreateInput) {
        return await this.prisma.keyExchange.create({
            data,
        });
    }
}
