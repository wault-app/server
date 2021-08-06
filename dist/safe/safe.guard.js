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
exports.SafeGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const device_service_1 = require("../device/device.service");
const prisma_service_1 = require("../prisma/prisma.service");
const zod_1 = require("zod");
let SafeGuard = class SafeGuard {
    constructor(prisma, device, reflector) {
        this.prisma = prisma;
        this.device = device;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (req.path === "/safe" && req.method === "POST") {
            const schema = zod_1.z.object({
                name: zod_1.z.string().min(1),
                keyExchanges: zod_1.z.array(zod_1.z.object({
                    deviceid: zod_1.z.string().min(1),
                    value: zod_1.z.string(),
                }))
            });
            const { keyExchanges } = schema.parse(req.body);
            let devices = await this.device.getAll({
                where: {
                    user: {
                        id: user.id,
                    },
                },
            });
            let created = {};
            keyExchanges.forEach((key) => created[key.deviceid] = true);
            if (devices.some((device) => !created[device.id]))
                throw new common_1.HttpException("Missing encryption key for devices", common_1.HttpStatus.BAD_REQUEST);
        }
        else if (req.path === "/safe" && (req.method === "DELETE" || req.method === "PUT")) {
            const roles = this.reflector.get('role', context.getHandler());
            if (!roles)
                return true;
            const id = zod_1.z.string().min(1).parse(req.params["id"]);
            const keycard = await this.prisma.keycard.findUnique({
                where: {
                    safeId_userId: {
                        safeId: id,
                        userId: user.id,
                    },
                },
            });
            if (!keycard || !roles.includes(keycard.role))
                throw new common_1.ForbiddenException();
        }
        return true;
    }
};
SafeGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, device_service_1.DeviceService, core_1.Reflector])
], SafeGuard);
exports.SafeGuard = SafeGuard;
//# sourceMappingURL=safe.guard.js.map