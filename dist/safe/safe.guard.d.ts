import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DeviceService } from 'src/device/device.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SafeGuard implements CanActivate {
    private prisma;
    private device;
    private reflector;
    constructor(prisma: PrismaService, device: DeviceService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
