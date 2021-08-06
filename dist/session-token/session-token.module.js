"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionTokenModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const secret_service_1 = require("../secret/secret.service");
const user_service_1 = require("../user/user.service");
let SessionTokenModule = class SessionTokenModule {
};
SessionTokenModule = __decorate([
    common_1.Module({
        providers: [user_service_1.UserService, prisma_service_1.PrismaService, secret_service_1.SecretService],
        exports: [user_service_1.UserService, prisma_service_1.PrismaService, secret_service_1.SecretService],
    })
], SessionTokenModule);
exports.SessionTokenModule = SessionTokenModule;
//# sourceMappingURL=session-token.module.js.map