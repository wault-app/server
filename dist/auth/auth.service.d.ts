import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { DeviceType } from '@prisma/client';
import { SecretService } from 'src/secret/secret.service';
import { DeviceService } from 'src/device/device.service';
import { SessionTokenService } from 'src/session-token/session-token.service';
export declare class AuthService {
    private prisma;
    private mail;
    private secret;
    private device;
    private sessionToken;
    constructor(prisma: PrismaService, mail: MailService, secret: SecretService, device: DeviceService, sessionToken: SessionTokenService);
    validateUser(sessionToken: string): Promise<import(".prisma/client").User>;
    verifyEmail(id: string, secret: string): Promise<{
        sessionToken: string;
    }>;
    sendVerificationEmail(username: string, email: string, deviceType: DeviceType, deviceName: string, rsaKey: string): Promise<void>;
}
