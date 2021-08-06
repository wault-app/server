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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async register(req) {
        const schema = zod_1.z.object({
            username: zod_1.z.string(),
            email: zod_1.z.string().email(),
            rsaKey: zod_1.z.string(),
            deviceType: zod_1.z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
            deviceName: zod_1.z.string(),
        });
        const { username, email, rsaKey, deviceType, deviceName } = schema.parse(req.body);
        await this.service.sendVerificationEmail(username, email, deviceType, deviceName, rsaKey);
        return {
            message: "Verification email sent!",
        };
    }
    async verifyEmail(req) {
        const schema = zod_1.z.object({
            id: zod_1.z.string(),
            secret: zod_1.z.string(),
        });
        const { id, secret } = schema.parse(req.body);
        const { sessionToken } = await this.service.verifyEmail(id, secret);
        return {
            message: "Successfully verified your email address!",
            sessionToken,
        };
    }
};
__decorate([
    common_1.Post("/register"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post("/register/verify"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map