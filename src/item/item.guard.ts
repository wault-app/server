import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType, User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class ItemGuard implements CanActivate {
    constructor(private prisma: PrismaService, private reflector: Reflector) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const roles = this.reflector.get<RoleType[]>('role', context.getHandler());

        if(!roles) return true;

        const schema = z.object({
            safeid: z.string(),
            data: z.string().min(3),
        });

        const req: Request = context.switchToHttp().getRequest();
        const { safeid } = schema.parse(req.body);

        // @ts-ignore
        const user: User = req["user"];

        const keycard = await this.prisma.keycard.findUnique({
            where: {
                safeId_userId: {
                    userId: user.id,
                    safeId: safeid,
                },
            },
        });

        if(!keycard || !roles.includes(keycard.role)) throw new ForbiddenException();

        return true;
    }
}
