"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
let RemoteAuthGuard = class RemoteAuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (req.path === "/auth/remote/start") {
            const schema = zod_1.z.object({
                deviceName: zod_1.z.string(),
                deviceType: zod_1.z.enum(["BROWSER", "MOBILE", "DESKTOP", "CLI"]),
                rsaKey: zod_1.z.string(),
            });
            schema.parse(req.body);
        }
        else if (req.path === "/auth/remote/scan") {
            const schema = zod_1.z.object({
                id: zod_1.z.string(),
            });
            schema.parse(req.body);
        }
        else if (req.path === "/auth/remote/send") {
            const schema = zod_1.z.object({
                id: zod_1.z.string(),
                keyExchanges: zod_1.z.array(zod_1.z.object({
                    safeid: zod_1.z.string(),
                    value: zod_1.z.string(),
                }))
            });
            schema.parse(req.body);
        }
        else if (req.path === "/auth/remote/check") {
            const schema = zod_1.z.object({
                id: zod_1.z.string(),
                secret: zod_1.z.string(),
            });
            schema.parse(req.body);
        }
        return true;
    }
};
RemoteAuthGuard = __decorate([
    common_1.Injectable()
], RemoteAuthGuard);
exports.RemoteAuthGuard = RemoteAuthGuard;
//# sourceMappingURL=remote-auth.guard.js.map