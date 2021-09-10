import { Device } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretService } from 'src/secret/secret.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenService {
    constructor(
        private secret: SecretService,
        private prisma: PrismaService
    ) {}

    public async create(device: Device) {
        const { secret, refreshToken } = this.generate(device);
        
        device = await this.prisma.device.update({
            where: {
                id: device.id,
            },
            data: {
                secret: await bcrypt.hash(secret, 10),
            },
        });

        return { refreshToken, device };
    }

    private generate(device: Device) {
        const secret = this.secret.generateHex(256);
        const refreshToken = Buffer.from(JSON.stringify(
            {
                id: device.id,
                secret,
            }
        )).toString("base64");

        return {
            secret,
            refreshToken,
        };
    }

    /**
     * Takes a refresh token and generates a new refresh token 
     * @param refreshToken {string} the old refresh token
     * @returns an object containing the refreshToken
     */
    public async refresh(refreshToken: string) {
        const { id, secret } = this.extract(refreshToken);

        const device = await this.prisma.device.findUnique({
            where: {
                id,
            },
        });

        if(!device || !secret || !(await bcrypt.compare(secret, device.secret || "NOT YET SET"))) throw new UnauthorizedException();
    
        return {
            refreshToken: (await this.create(device)).refreshToken,
            device,
        };
    }

    /**
     * Extracts data from refresh token.
     * @param refreshToken {string} refresh token as a string
     * @returns an object containing the device id and secret
     */
    private extract(refreshToken: string): { id: string, secret: string } {
        return JSON.parse(Buffer.from(refreshToken, "base64").toString("ascii"));
    }
}
