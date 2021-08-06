import { User } from 'src/user/user.decorator';
import { DeviceService } from './device.service';
export declare class DeviceController {
    private device;
    constructor(device: DeviceService);
    getAll(user: User): Promise<{
        devices: (import(".prisma/client").Device & {})[];
    }>;
}
