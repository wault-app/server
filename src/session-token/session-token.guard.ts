import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SessionTokenGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}
    
    async canActivate(
        context: ExecutionContext,
    ):  Promise<boolean> {
        // extract the session token from the request
        const req: Request = context.switchToHttp().getRequest();
        const sessionToken = req.cookies["session_token"] || req.headers.authorization?.replace("Bearer ", "");
        
        // if no session token is provided, then throw unauthorized exception
        if(!sessionToken) throw new UnauthorizedException();

        // extract device id from session token
        const { device: { id } } = JSON.parse(Buffer.from(sessionToken, "base64").toString("utf-8"))

        // find the device inside the database
        const device = await this.prisma.device.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });

        // compare our session token with the one inside the db
        if(!device || !(await bcrypt.compare(sessionToken, device.sessionToken))) throw new UnauthorizedException();

        // pass the user and the device object to controllers
        req["device"] = device;
        req["user"] = device.user; 

        // if all test passed, then enable the route 
        return true;
    }
}
