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
exports.ItemGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_service_1 = require("../prisma/prisma.service");
const zod_1 = require("zod");
let ItemGuard = class ItemGuard {
    constructor(prisma, reflector) {
        this.prisma = prisma;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('role', context.getHandler());
        if (!roles)
            return true;
        const schema = zod_1.z.object({
            safeid: zod_1.z.string(),
            data: zod_1.z.string().min(3),
        });
        const req = context.switchToHttp().getRequest();
        const { safeid } = schema.parse(req.body);
        const user = req["user"];
        const keycard = await this.prisma.keycard.findUnique({
            where: {
                safeId_userId: {
                    userId: user.id,
                    safeId: safeid,
                },
            },
        });
        if (!keycard || !roles.includes(keycard.role))
            throw new common_1.ForbiddenException();
        return true;
    }
};
ItemGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, core_1.Reflector])
], ItemGuard);
exports.ItemGuard = ItemGuard;
//# sourceMappingURL=item.guard.js.map