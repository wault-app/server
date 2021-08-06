import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Device as PrismaDevice } from "@prisma/client";

export const Device = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.device;
    },
);

export type Device = PrismaDevice;