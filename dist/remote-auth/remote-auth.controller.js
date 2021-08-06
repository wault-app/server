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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteAuthController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const session_token_guard_1 = require("../session-token/session-token.guard");
const user_decorator_1 = require("../user/user.decorator");
const remote_auth_guard_1 = require("./remote-auth.guard");
const remote_auth_service_1 = require("./remote-auth.service");
let RemoteAuthController = class RemoteAuthController {
    constructor(service) {
        this.service = service;
    }
    async start(deviceName, deviceType, rsaKey) {
        const { id, secret } = await this.service.start(deviceName, deviceType, rsaKey);
        return {
            id,
            secret,
        };
    }
    async scan(user, id) {
        const { rsaKey } = await this.service.scan(user, id);
        return {
            message: "Successful scan!",
            rsaKey,
        };
    }
    async send(id, keyExchanges) {
        await this.service.send(id, keyExchanges);
        return {
            message: "Successfully logged device in!",
        };
    }
    async check(id, secret) {
        return await this.service.check(id, secret);
    }
};
__decorate([
    common_1.Post("/start"),
    common_1.UseGuards(remote_auth_guard_1.RemoteAuthGuard),
    __param(0, common_1.Body("deviceName")),
    __param(1, common_1.Body("deviceType")),
    __param(2, common_1.Body("rsaKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RemoteAuthController.prototype, "start", null);
__decorate([
    common_1.Post("/scan"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, remote_auth_guard_1.RemoteAuthGuard),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RemoteAuthController.prototype, "scan", null);
__decorate([
    common_1.Post("/send"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, remote_auth_guard_1.RemoteAuthGuard),
    __param(0, common_1.Body("id")),
    __param(1, common_1.Body("keyExchanges")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RemoteAuthController.prototype, "send", null);
__decorate([
    common_1.Post("/check"),
    common_1.UseGuards(remote_auth_guard_1.RemoteAuthGuard),
    __param(0, common_1.Body("id")),
    __param(1, common_1.Body("secret")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RemoteAuthController.prototype, "check", null);
RemoteAuthController = __decorate([
    common_1.Controller('/auth/remote'),
    __metadata("design:paramtypes", [remote_auth_service_1.RemoteAuthService])
], RemoteAuthController);
exports.RemoteAuthController = RemoteAuthController;
//# sourceMappingURL=remote-auth.controller.js.map