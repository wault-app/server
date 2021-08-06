import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SafeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.KeycardCreateInput): Promise<{
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
    }>;
    getAll(where?: Prisma.KeycardWhereInput): Promise<{
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
    }[]>;
    edit(data: Prisma.KeycardUpdateArgs): Promise<import(".prisma/client").Keycard & {}>;
}
