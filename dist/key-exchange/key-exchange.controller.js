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
exports.KeyExchangeController = void 0;
const common_1 = require("@nestjs/common");
const device_decorator_1 = require("../device/device.decorator");
const session_token_guard_1 = require("../session-token/session-token.guard");
const key_exchange_service_1 = require("./key-exchange.service");
let KeyExchangeController = class KeyExchangeController {
    constructor(service) {
        this.service = service;
    }
    async getAll(device) {
        return {
            keyExchanges: await this.service.getAll({
                where: {
                    device: {
                        id: device.id,
                    },
                },
            }),
        };
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard),
    __param(0, device_decorator_1.Device()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KeyExchangeController.prototype, "getAll", null);
KeyExchangeController = __decorate([
    common_1.Controller('key-exchange'),
    __metadata("design:paramtypes", [key_exchange_service_1.KeyExchangeService])
], KeyExchangeController);
exports.KeyExchangeController = KeyExchangeController;
//# sourceMappingURL=key-exchange.controller.js.map