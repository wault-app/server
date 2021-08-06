import { Controller, Get, UseGuards } from '@nestjs/common';
import { Device } from 'src/device/device.decorator';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { KeyExchangeService } from './key-exchange.service';

@Controller('key-exchange')
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
