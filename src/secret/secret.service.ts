import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class SecretService {
    generateHex(bytes: number) {
        return randomBytes(bytes).toString("hex");
    }
}
