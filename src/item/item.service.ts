import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) {}
    
    async create(data: Prisma.ItemCreateInput) {
        return await this.prisma.item.create({
            data,
        });
    }

    async update(data: Prisma.ItemUpdateArgs) {
        return await this.prisma.item.update(data);
    }

    async delete(data: Prisma.ItemDeleteArgs) {
        return await this.prisma.item.delete(data);    
    }
}
