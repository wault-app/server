import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { z } from 'zod';

@Injectable()
export class RemoteAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if(req.path === "/auth/remote/start") {
            // start remote auth endpoint
            const schema = z.object({
                deviceName: z.string(),
                deviceType: z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
                rsaKey: z.string(),
            });

            schema.parse(req.body);
        } else if(req.path === "/auth/remote/scan") {
            const schema = z.object({
                id: z.string(),
            });

            schema.parse(req.body);
        } else if(req.path === "/auth/remote/send") {
            const schema = z.object({
                id: z.string(),
                keyExchanges: z.array(
                    z.object({
                        safeid: z.string(),
                        value: z.string(),
                    }),
                )
            });

            schema.parse(req.body);
        } else if(req.path === "/auth/remote/check") {
            const schema = z.object({
                id: z.string(),
                secret: z.string(),
            });

            schema.parse(req.body);
        }

        return true;
    }
}
