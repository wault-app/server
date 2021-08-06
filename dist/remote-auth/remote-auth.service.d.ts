import { DeviceType, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretService } from 'src/secret/secret.service';
import { SessionTokenService } from 'src/session-token/session-token.service';
export declare class RemoteAuthService {
    private prisma;
    private secret;
    private sessionToken;
    constructor(prisma: PrismaService, secret: SecretService, sessionToken: SessionTokenService);
    start(deviceName: string, deviceType: DeviceType, rsaKey: string): Promise<{
        id: string;
        secret: string;
    }>;
    scan(user: User, id: string): Promise<import(".prisma/client").Authentication>;
    send(id: string, keyExchanges: ({
        safeid: string;
        value: string;
    })[]): Promise<void>;
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
