import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as PrismaUser } from '.prisma/client';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export type User = PrismaUser;