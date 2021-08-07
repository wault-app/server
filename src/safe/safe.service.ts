import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SafeService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.KeycardCreateInput) {
        return await this.prisma.keycard.create({
            data,
            select: {
                id: true,
                role: true,
                safe: {
                    select: {
                        id: true,
                        name: true,
                        items: {
                            select: {
                                id: true,
                                data: true,
                            },
                        },
                        keycards: {
                            select: {
                                id: true,
                                role: true,
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                        email: true,
                                        icon: {
                                            select: {
                                                id: true,
                                                type: true,
                                                value: true,
                                            },
                                        },
                                        devices: {
                                            select: {
                                                id: true,
                                                rsaKey: true,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
    }

    async getAll(where?: Prisma.KeycardWhereInput) {
        return await this.prisma.keycard.findMany({
            where,
            select: {
                id: true,
                role: true,
                safe: {
                    select: {
                        id: true,
                        name: true,
                        items: {
                            select: {
                                id: true,
                                data: true,
                            },
                        },
                        keycards: {
                            select: {
                                id: true,
                                role: true,
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                        email: true,
                                        icon: {
                                            select: {
                                                id: true,
                                                type: true,
                                                value: true,
                                            },
                                        },
                                        devices: {
                                            select: {
                                                id: true,
                                                rsaKey: true,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
    }

    async edit(data: Prisma.KeycardUpdateArgs) {
        return await this.prisma.keycard.update({
            select: {
                id: true,
                safe: {
                    select: {
                        id: true,
                        name: true,
                        items: {
                            select: {
                                id: true,
                                data: true,
                            },
                        },
                        keycards: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                        email: true,
                                        icon: {
                                            select: {
                                                id: true,
                                                type: true,
                                                value: true,
                                            },
                                        },
                                        devices: {
                                            select: {
                                                id: true,
                                                rsaKey: true,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            ...data,
        });
    }
}
