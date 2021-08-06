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
exports.SessionTokenService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const secret_service_1 = require("../secret/secret.service");
let SessionTokenService = class SessionTokenService {
    constructor(secret, prisma) {
        this.secret = secret;
        this.prisma = prisma;
    }
    async create(device) {
        const { user } = await this.prisma.device.findUnique({
            where: {
                id: device.id,
            },
            include: {
                user: true,
            },
        });
        const secret = await this.secret.generateHex(512);
        const sessionToken = Buffer.from(JSON.stringify({
            id: user.id,
            secret,
            username: user.username,
            email: user.email,
            device: {
                id: device.id,
                name: device.name,
                type: device.type,
                rsaKey: device.rsaKey,
            },
        })).toString("base64");
        await this.prisma.device.update({
            where: {
                id: device.id,
            },
            data: {
                sessionToken: await bcrypt.hash(sessionToken, 10),
            },
        });
        return sessionToken;
    }
};
SessionTokenService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [secret_service_1.SecretService, prisma_service_1.PrismaService])
], SessionTokenService);
exports.SessionTokenService = SessionTokenService;
//# sourceMappingURL=session-token.service.js.map