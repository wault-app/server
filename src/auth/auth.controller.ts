import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDTO } from 'src/dto/LoginDTO';
import { RegisterDTO } from 'src/dto/RegisterDTO';
import { z } from 'zod';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
    constructor (private service: AuthService) {}

    @Post("/register")
    @ApiBody({
        type: RegisterDTO
    })
    async register(@Body() body: RegisterDTO) {
        const schema = z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string(),

            rsa: z.object({
                public: z.string().min(1),
                private: z.string().min(1),
            }).required(),
            
            deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
            deviceName: z.string(),
        });
        
        const { username, email, password, deviceType, deviceName } = schema.parse(body);

        await this.service.sendVerificationEmail(username, email, password, deviceType, deviceName, body.rsa);

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

    @Post("/login")
    async login(@Body() body: LoginDTO) {
        const schema = z.object({
            email: z.string(),
            password: z.string(),
            deviceName: z.string(),
            deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
        });

        const { email, password, deviceName, deviceType } = schema.parse(body);

        const { sessionToken } = await this.service.login(email, password, deviceName, deviceType);

        return {
            message: "Successful authentication!",
            sessionToken,
        };
    }
}
