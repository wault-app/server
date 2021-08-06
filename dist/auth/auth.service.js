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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
const secret_service_1 = require("../secret/secret.service");
const device_service_1 = require("../device/device.service");
const session_token_service_1 = require("../session-token/session-token.service");
let AuthService = class AuthService {
    constructor(prisma, mail, secret, device, sessionToken) {
        this.prisma = prisma;
        this.mail = mail;
        this.secret = secret;
        this.device = device;
        this.sessionToken = sessionToken;
    }
    async validateUser(sessionToken) {
        const { id, secret } = JSON.parse(Buffer.from(sessionToken, "base64").toString("utf-8"));
        const device = await this.prisma.device.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        if (!device || !(await bcrypt.compare(secret, device.sessionToken)))
            throw new common_1.UnauthorizedException();
        return device.user;
    }
    async verifyEmail(id, secret) {
        const confirmation = await this.prisma.emailConfirmation.findUnique({
            where: {
                id,
            },
        });
        if (!confirmation || !(await bcrypt.compare(secret, confirmation.secret)))
            throw new common_1.ForbiddenException();
        await this.prisma.emailConfirmation.delete({
            where: {
                id,
            },
        });
        const device = await this.device.create({
            user: {
                create: {
                    username: confirmation.username,
                    email: confirmation.email,
                },
            },
            name: confirmation.deviceName,
            type: confirmation.deviceType,
            rsaKey: confirmation.rsaKey,
        });
        const sessionToken = await this.sessionToken.create(device);
        return {
            sessionToken,
        };
    }
    async sendVerificationEmail(username, email, deviceType, deviceName, rsaKey) {
        const secret = this.secret.generateHex(128);
        const { id } = await this.prisma.emailConfirmation.create({
            data: {
                secret: await bcrypt.hash(secret, 10),
                email,
                username,
                deviceType,
                deviceName,
                rsaKey,
            },
        });
        await this.mail.send({
            to: email,
            from: "Wault <noreply@wault.app>",
            templateId: "d-df88e2e7c5d14b69b50dd517220f78cd",
            dynamicTemplateData: {
                id,
                secret,
                username,
            },
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService,
        secret_service_1.SecretService,
        device_service_1.DeviceService,
        session_token_service_1.SessionTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map