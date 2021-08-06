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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../role/role.decorator");
const session_token_guard_1 = require("../session-token/session-token.guard");
const item_guard_1 = require("./item.guard");
const item_service_1 = require("./item.service");
let ItemController = class ItemController {
    constructor(service) {
        this.service = service;
    }
    async create(safeid, data) {
        const item = await this.service.create({
            safe: {
                connect: {
                    id: safeid,
                },
            },
            data,
        });
        return {
            message: "Item successfully added to safe!",
            item,
        };
    }
    async edit(id, data) {
        const item = await this.service.update({
            where: {
                id,
            },
            data: {
                data,
            },
        });
        return {
            message: "Item successfully updated!",
            item,
        };
    }
    async delete(id) {
        await this.service.delete({
            where: {
                id,
            },
        });
        return {
            message: "Item successfully deleted!",
        };
    }
};
__decorate([
    common_1.Post(),
    role_decorator_1.Role("OWNER", "WRITER"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, item_guard_1.ItemGuard),
    __param(0, common_1.Body("safeid")),
    __param(1, common_1.Body("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "create", null);
__decorate([
    common_1.Put(":id"),
    role_decorator_1.Role("OWNER", "WRITER"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, item_guard_1.ItemGuard),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "edit", null);
__decorate([
    common_1.Delete(":id"),
    role_decorator_1.Role("OWNER", "WRITER"),
    common_1.UseGuards(session_token_guard_1.SessionTokenGuard, item_guard_1.ItemGuard),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "delete", null);
ItemController = __decorate([
    common_1.Controller('item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map