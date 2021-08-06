import { Device } from 'src/device/device.decorator';
import { KeyExchangeService } from './key-exchange.service';
export declare class KeyExchangeController {
    private service;
    constructor(service: KeyExchangeService);
    getAll(device: Device): Promise<{
        keyExchanges: (import(".prisma/client").KeyExchange & {})[];
    }>;
}
