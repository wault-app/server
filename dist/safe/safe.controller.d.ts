import { KeyExchangeService } from 'src/key-exchange/key-exchange.service';
import { User } from 'src/user/user.decorator';
import { SafeService } from './safe.service';
export declare class SafeController {
    private keycard;
    private keyExchange;
    constructor(keycard: SafeService, keyExchange: KeyExchangeService);
    getAll(user: User): Promise<{
        keycards: {
            id: string;
            safe: {
                id: string;
                name: string;
                keycards: {
                    id: string;
                    user: {
                        id: string;
                        username: string;
                        email: string;
                        icon: {
                            id: string;
                            value: string;
                            type: import(".prisma/client").IconType;
                        };
                        devices: {
                            id: string;
                            rsaKey: string;
                        }[];
                    };
                }[];
                items: {
                    id: string;
                    data: string;
                }[];
            };
        }[];
    }>;
    create(name: string, keyExchanges: any, user: User): Promise<{
        message: string;
        keycard: {
            id: string;
            safe: {
                id: string;
                name: string;
                keycards: {
                    id: string;
                    user: {
                        id: string;
                        username: string;
                        email: string;
                        icon: {
                            id: string;
                            value: string;
                            type: import(".prisma/client").IconType;
                        };
                        devices: {
                            id: string;
                            rsaKey: string;
                        }[];
                    };
                }[];
                items: {
                    id: string;
                    data: string;
                }[];
            };
        };
    }>;
    edit(id: string, user: User, name: string): Promise<{
        message: string;
        keycard: import(".prisma/client").Keycard & {};
    }>;
    delete(id: string): Promise<void>;
}
