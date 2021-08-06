import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
    providers: [DeviceService, PrismaService],
    controllers: [DeviceController]
})
export class DeviceModule {}
