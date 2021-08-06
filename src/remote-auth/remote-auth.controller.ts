import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DeviceType } from '@prisma/client';
import { serialize } from 'cookie';
import { Request, Response } from 'express';
import { SessionTokenGuard } from 'src/session-token/session-token.guard';
import { User } from 'src/user/user.decorator';
import { RemoteAuthGuard } from './remote-auth.guard';
import { RemoteAuthService } from './remote-auth.service';

@Controller('/auth/remote')
export class RemoteAuthController {
    constructor(private service: RemoteAuthService) { }

    @Post("/start")
    @UseGuards(RemoteAuthGuard)
    async start(
        @Body("deviceName") deviceName: string,
        @Body("deviceType") deviceType: DeviceType,
        @Body("rsaKey") rsaKey: string
    ) {
        const { id, secret } = await this.service.start(deviceName, deviceType, rsaKey);

        return {
            id,
            secret,
        };
    }

    @Post("/scan")
    @UseGuards(SessionTokenGuard, RemoteAuthGuard)
    async scan(@User() user: User, @Body("id") id: string) {
        const { rsaKey } = await this.service.scan(user, id);

        return {
            message: "Successful scan!",
            rsaKey,
        };
    }

    @Post("/send")
    @UseGuards(SessionTokenGuard, RemoteAuthGuard)
    async send(@Body("id") id: string, @Body("keyExchanges") keyExchanges) {
        await this.service.send(id, keyExchanges);

        return {
            message: "Successfully logged device in!",
        };
    }

    @Post("/check")
    @UseGuards(RemoteAuthGuard)
    async check(@Body("id") id: string, @Body("secret") secret: string, @Res() res: Response, @Body("web") web?: boolean) {
        const resp = await this.service.check(id, secret);

        if (resp.sessionToken && web) {
            res.setHeader(
                "Set-Cookie",
                serialize("session_token", resp.sessionToken,
                    {
                        secure: process.env.NODE_ENV === "production",
                        httpOnly: true,
                        sameSite: "none",
                        path: "/",
                        domain: ".wault.app",
                        expires: new Date("2038-01-19"), // max age for cookies
                    }
                )
            );

            delete resp.sessionToken;
        }

        return resp;
    }
}
