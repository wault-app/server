import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { User } from 'src/user/user.decorator';
import { DeviceService } from './device.service';

@Controller('device')
@ApiTags("device")
@ApiBearerAuth()
export class DeviceController {
    constructor(private device: DeviceService) {}
    
    @Get()
    @UseGuards(SessionTokenGuard)
    async getAll(@User() user: User) {
        const devices = await this.device.getAll({
            where: {
                user: {
                    id: user.id,
                },
            },
        });

        return {
            devices,
        };
    }
}
