import { DeviceType } from '@prisma/client';
import { User } from 'src/user/user.decorator';
import { RemoteAuthService } from './remote-auth.service';
export declare class RemoteAuthController {
    private service;
    constructor(service: RemoteAuthService);
    start(deviceName: string, deviceType: DeviceType, rsaKey: string): Promise<{
        id: string;
        secret: string;
    }>;
    scan(user: User, id: string): Promise<{
        message: string;
        rsaKey: string;
    }>;
    send(id: string, keyExchanges: any): Promise<{
        message: string;
    }>;
    check(id: string, secret: string): Promise<{
        message: string;
        user?: undefined;
        sessionToken?: undefined;
    } | {
        message: string;
        user: {
            username: string;
            email: string;
            icon: import(".prisma/client").Icon;
        };
        sessionToken?: undefined;
    } | {
        message: string;
        sessionToken: string;
        user: {
            username: string;
            email: string;
            icon: import(".prisma/client").Icon;
        };
    }>;
}
