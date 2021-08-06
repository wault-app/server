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
exports.SessionTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let SessionTokenGuard = class SessionTokenGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        var _a;
        const req = context.switchToHttp().getRequest();
        const sessionToken = req.cookies["session_token"] || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", ""));
        if (!sessionToken)
            throw new common_1.UnauthorizedException();
        const { device: { id } } = JSON.parse(Buffer.from(sessionToken, "base64").toString("utf-8"));
        const device = await this.prisma.device.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        if (!device || !(await bcrypt.compare(sessionToken, device.sessionToken)))
            throw new common_1.UnauthorizedException();
        req["device"] = device;
        req["user"] = device.user;
        return true;
    }
};
SessionTokenGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionTokenGuard);
exports.SessionTokenGuard = SessionTokenGuard;
//# sourceMappingURL=session-token.guard.js.map