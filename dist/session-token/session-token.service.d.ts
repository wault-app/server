import { Device } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretService } from 'src/secret/secret.service';
export declare class SessionTokenService {
    private secret;
    private prisma;
    constructor(secret: SecretService, prisma: PrismaService);
    create(device: Device): Promise<string>;
}
