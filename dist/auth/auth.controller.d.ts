import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    register(req: Request): Promise<{
        message: string;
    }>;
    verifyEmail(req: Request): Promise<{
        message: string;
        sessionToken: string;
    }>;
}
