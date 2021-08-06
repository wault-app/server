"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SafeService = class SafeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.keycard.create({
            data,
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
        });
    }
    async getAll(where) {
        return await this.prisma.keycard.findMany({
            where,
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
        });
    }
    async edit(data) {
        return await this.prisma.keycard.update(Object.assign({ select: {
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
            } }, data));
    }
};
SafeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SafeService);
exports.SafeService = SafeService;
//# sourceMappingURL=safe.service.js.map