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
exports.SafeController = void 0;
const common_1 = require("@nestjs/common");
const key_exchange_service_1 = require("../key-exchange/key-exchange.service");
const role_decorator_1 = require("../role/role.decorator");
const session_token_guard_1 = require("../session-token/session-token.guard");
const user_decorator_1 = require("../user/user.decorator");
const safe_guard_1 = require("./safe.guard");
const safe_service_1 = require("./safe.service");
let SafeController = class SafeController {
    constructor(keycard, keyExchange) {
        this.keycard = keycard;
        this.keyExchange = keyExchange;
    }
    async getAll(user) {
        return {
            keycards: await this.keycard.getAll({
                user: {
                    id: user.id,
                },
            }),
        };
    }
    async create(name, keyExchanges, user) {
        const keycard = await this.keycard.create({
            safe: {
                create: {
                    name,
                },
            },
            role: "OWNER",
            user: {
                connect: {
                    id: user.id,
                },
            },
        });
        await Promise.all(keyExchanges.map(async (key) => {
            await this.keyExchange.create({
                device: {
                    connect: {
                        id: key.deviceid,
                    },
                },
                value: key.value,
                safe: {
                    connect: {
                        id: keycard.safe.id,
                    },
                },
            });
        }));
        return {
            message: "Safe successfully created!",
            keycard,
        };
    }
    async edit(id, user, name) {
        const keycard = await this.keycard.edit({
            where: {
                safeId_userId: {
                    safeId: id,
                    userId: user.id,
                },
            },
            data: {
                safe: {
                    update: {
                        name,
                    },
                },
            },
        });
        return {
            message: "Safe was successfully edited!",
            keycard,
        };
    }
    async delete(id) {
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SafeController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, safe_guard_1.SafeGuard),
    __param(0, common_1.Body("name")),
    __param(1, common_1.Body("keyExchanges")),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SafeController.prototype, "create", null);
__decorate([
    common_1.Put(":id"),
    role_decorator_1.Role("OWNER", "WRITER"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, safe_guard_1.SafeGuard),
    __param(0, common_1.Param("id")),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Body("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], SafeController.prototype, "edit", null);
__decorate([
    common_1.Delete(":id"),
    role_decorator_1.Role("OWNER"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, safe_guard_1.SafeGuard),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SafeController.prototype, "delete", null);
SafeController = __decorate([
    common_1.Controller('safe'),
    __metadata("design:paramtypes", [safe_service_1.SafeService, key_exchange_service_1.KeyExchangeService])
], SafeController);
exports.SafeController = SafeController;
//# sourceMappingURL=safe.controller.js.map