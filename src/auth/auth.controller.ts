import { Body, Controller, ForbiddenException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieSerializeOptions, serialize } from 'cookie';
import { Request, Response } from 'express';
import { LoginDTO } from 'src/dto/LoginDTO';
import { RegisterDTO } from 'src/dto/RegisterDTO';
import { User } from 'src/user/user.decorator';
import { z } from 'zod';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from './jwt.guard';
import { VerifyEmailDTO } from 'src/dto/VerifyEmailDTO';
import { RefreshTokenDTO } from 'src/dto/RefreshTokenDTO';

const cookieOptions: CookieSerializeOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date("2038-01-19"),
};

@ApiTags("auth")
@Controller("/auth")
export class AuthController {
    constructor (private service: AuthService) {}

    @Post("/register")
    async register(@Body() body: RegisterDTO) {
        const schema = z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string(),

            rsa: z.object({
                publicKey: z.string(),
                privateKey: z.string(), // encrypted version via the password
            }).required(),
            
            deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
            deviceName: z.string(),
        });
        
        const data = schema.parse(body);

        await this.service.sendVerificationEmail(data);

        return {
            message: "Verification email sent!",
        };
    }

    @Post("/refresh_token")
    async refreshToken(@Body() body: RefreshTokenDTO, @Req() req: Request, @Res() res: Response) {
        const token = body.refreshToken || req.cookies.refresh_token;
        if(!token) throw new ForbiddenException({ message: "A refresh token was not present in the header." }); 
        
        const { accessToken, refreshToken, device } = await this.service.refreshToken(token);

        if(device.type === "BROWSER") {
            res.setHeader(
                "Set-Cookie",
                [
                    serialize("access_token", accessToken, cookieOptions),
                    serialize("refresh_token", refreshToken, cookieOptions),
                ]
            )

            res.json({});
        }

        return {
            accessToken,
            refreshToken,
        };
    }

    @Post("/register/verify")
    async verifyEmail(@Body() body: VerifyEmailDTO, @Res() res: Response) {
        const schema = z.object({
            id: z.string(),
            secret: z.string(),
        });

        const { id, secret } = schema.parse(body);

        const { accessToken, refreshToken, device } = await this.service.verifyEmail(id, secret);

        if(device.type === "BROWSER") {
            res.setHeader(
                "Set-Cookie",
                [
                    serialize("access_token", accessToken, cookieOptions),
                    serialize("refresh_token", refreshToken, cookieOptions),
                ],
            );

            const resp = {
                message: "Successfully verified your email address!",
            };

            res.json(resp);
            return resp;
        }

        return {
            message: "Successfully verified your email address!",
            accessToken,
            refreshToken,
        };
    }

    @Post("/login")
    async login(@Body() body: LoginDTO, @Res() res: Response) {
        const schema = z.object({
            email: z.string(),
            password: z.string(),
            deviceName: z.string(),
            deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
        });

        const { email, password, deviceName, deviceType } = schema.parse(body);

        const { accessToken, refreshToken, rsa: { publicKey, privateKey } } = await this.service.login(email, password, deviceName, deviceType);

        if(deviceType === "BROWSER") {
            res.setHeader(
                "Set-Cookie",
                [
                    serialize("access_token", accessToken, cookieOptions),
                    serialize("refresh_token", refreshToken, cookieOptions)
                ]
            );

            res.json({
                message: "Successful authentication!",
                publicKey,
                privateKey,
            });
        }

        return {
            message: "Successful authentication!",
            refreshToken,
            accessToken,
            publicKey,
            privateKey,
        };
    }

    @Post("/checkPassword")
    @UseGuards(JwtAuthGuard)
    async checkPassword(@Body("password") password: string, @User() user: User) {
        // checks if the given password matches the stored one in the database
        if(!(await bcrypt.compare(password, user.password))) throw new ForbiddenException("Your password does not match!");

        // if check was successful, send back an answer
        return {
            message: "Successful authentication!",
            publicKey: user.publicKey,
            privateKey: user.privateKey,
        };
    }
}
