import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: JwtStrategy.extractor,
            ignoreExpiration: true,
            passReqToCallback: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(req: Request, payload: any) {
        if(!payload) throw new ForbiddenException();

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        if(!user) throw new UnauthorizedException("jwt_token_expired");
 
        return user;
    }

    static extractor(req: Request) {
        try {
            const cookieToken = req.cookies.access_token;
            const bearerToken = req.headers.authorization?.split(" ")[1];
    
            const accessToken = bearerToken || cookieToken;
            jwt.verify(accessToken, process.env.JWT_SECRET || "");
    
            return bearerToken || cookieToken;
        } catch(e) {
            if(e.message === "jwt expired") throw new UnauthorizedException("jwt_token_expired");
            else throw e;
        }
    }
}