import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private service: AuthService) {}

    @Post("/register")
    async register(@Req() req: Request) {
        const schema = z.object({
            username: z.string(),
            email: z.string().email(),
            rsaKey: z.string(),
            deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
            deviceName: z.string(),
        });
        
        const { username, email, rsaKey, deviceType, deviceName } = schema.parse(req.body);

        await this.service.sendVerificationEmail(username, email, deviceType, deviceName, rsaKey);

        return {
            message: "Verification email sent!",
        };
    }

    @Post("/register/verify")
    async verifyEmail(@Req() req: Request) {
        const schema = z.object({
            id: z.string(),
            secret: z.string(),
        });

        const { id, secret } = schema.parse(req.body);

        const { sessionToken } = await this.service.verifyEmail(id, secret);

        return {
            message: "Successfully verified your email address!",
            sessionToken,
        };
    }
}
