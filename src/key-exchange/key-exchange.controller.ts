import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Device } from 'src/device/device.decorator';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { KeyExchangeService } from './key-exchange.service';

@Controller('key-exchange')
@ApiTags("key-exchange")
@ApiBearerAuth()
export class KeyExchangeController {
    constructor(private service: KeyExchangeService) {}
    
    @Get()
    @UseGuards(SessionTokenGuard)
    async getAll(@Device() device: Device) {
        return {
            keyExchanges: await this.service.getAll({
                where: {
                    device: {
                        id: device.id,
                    },
                },
            }),
        };
    }
}
