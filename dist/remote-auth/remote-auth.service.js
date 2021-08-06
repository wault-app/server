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
exports.RemoteAuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const secret_service_1 = require("../secret/secret.service");
const bcrypt = require("bcrypt");
const session_token_service_1 = require("../session-token/session-token.service");
let RemoteAuthService = class RemoteAuthService {
    constructor(prisma, secret, sessionToken) {
        this.prisma = prisma;
        this.secret = secret;
        this.sessionToken = sessionToken;
    }
    async start(deviceName, deviceType, rsaKey) {
        const secret = this.secret.generateHex(512);
        const { id } = await this.prisma.authentication.create({
            data: {
                deviceName,
                deviceType,
                rsaKey,
                secret: await bcrypt.hash(secret, 10),
            },
        });
        return {
            id,
            secret,
        };
    }
    async scan(user, id) {
        return await this.prisma.authentication.update({
            where: {
                id,
            },
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    }
    async send(id, keyExchanges) {
        const auth = await this.prisma.authentication.findUnique({
            where: {
                id,
            },
        });
        await this.prisma.authentication.update({
            where: {
                id,
            },
            data: {
                device: {
                    create: {
                        name: auth.deviceName,
                        type: auth.deviceType,
                        rsaKey: auth.rsaKey,
                        user: {
                            connect: {
                                id: auth.userId,
                            },
                        },
                        keyExchanges: {
                            createMany: {
                                data: keyExchanges.map((key) => ({
                                    value: key.value,
                                    safeId: key.safeid,
                                })),
                            },
                        },
                    },
                },
            },
        });
    }
    async check(id, secret) {
        const auth = await this.prisma.authentication.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    include: {
                        icon: true,
                    },
                },
                device: true,
            }
        });
        if (!auth || !(await bcrypt.compare(secret, auth.secret)))
            throw new common_1.ForbiddenException();
        if (!auth.user) {
            return {
                message: "remote_auth_not_scanned",
            };
        }
        else if (auth.user && !auth.device) {
            return {
                message: "remote_auth_scanned",
                user: {
                    username: auth.user.username,
                    email: auth.user.email,
                    icon: auth.user.icon,
                },
            };
        }
        else {
            const sessionToken = await this.sessionToken.create(auth.device);
            return {
                message: "remote_auth_success",
                sessionToken,
                user: {
                    username: auth.user.username,
                    email: auth.user.email,
                    icon: auth.user.icon,
                },
            };
        }
    }
};
RemoteAuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, secret_service_1.SecretService, session_token_service_1.SessionTokenService])
], RemoteAuthService);
exports.RemoteAuthService = RemoteAuthService;
//# sourceMappingURL=remote-auth.service.js.map