import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType, User } from '@prisma/client';
import { Request } from 'express';
import { DeviceService } from 'src/device/device.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class SafeGuard implements CanActivate {
    constructor(private prisma: PrismaService, private device: DeviceService, private reflector: Reflector) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        // @ts-ignore
        const user: User = req.user;

        if (req.path === "/safe" && req.method === "POST") {
            // check for body type mismatch
            const schema = z.object({
                name: z.string().min(1),
                keyExchanges: z.array(
                    z.object({
                        deviceid: z.string().min(1),
                        value: z.string(),
                    })
                )
            })

            const { keyExchanges } = schema.parse(req.body);

            // get all device for the user
            let devices = await this.device.getAll({
                where: {
                    user: {
                        id: user.id,
                    },
                },
            });

            // check if at least one device's encryption key is missing
            let created: { [deviceid: string]: true } = {};
            keyExchanges.forEach((key) => created[key.deviceid] = true);
            if (devices.some((device) => !created[device.id])) throw new HttpException("Missing encryption key for devices", HttpStatus.BAD_REQUEST);
        } else if (req.path === "/safe" && (req.method === "DELETE" || req.method === "PUT")) {
            const roles = this.reflector.get<RoleType[]>('role', context.getHandler());

            if (!roles) return true;

            // get id from the request
            const id = z.string().min(1).parse(req.params["id"]);

            const keycard = await this.prisma.keycard.findUnique({
                where: {
                    safeId_userId: {
                        safeId: id,
                        userId: user.id,
                    },
                },
            });

            // check if keycard exists and user has eigable permission
            if (!keycard || !roles.includes(keycard.role)) throw new ForbiddenException();
        }

        return true;
    }
}
