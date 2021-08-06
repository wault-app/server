"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const safe_controller_1 = require("./safe/safe.controller");
const item_controller_1 = require("./item/item.controller");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const throttler_1 = require("@nestjs/throttler");
const mail_module_1 = require("./mail/mail.module");
const secret_service_1 = require("./secret/secret.service");
const device_service_1 = require("./device/device.service");
const session_token_service_1 = require("./session-token/session-token.service");
const device_module_1 = require("./device/device.module");
const session_token_module_1 = require("./session-token/session-token.module");
const secret_module_1 = require("./secret/secret.module");
const prisma_module_1 = require("./prisma/prisma.module");
const safe_service_1 = require("./safe/safe.service");
const key_exchange_service_1 = require("./key-exchange/key-exchange.service");
const user_service_1 = require("./user/user.service");
const user_module_1 = require("./user/user.module");
const key_exchange_controller_1 = require("./key-exchange/key-exchange.controller");
const item_service_1 = require("./item/item.service");
const remote_auth_controller_1 = require("./remote-auth/remote-auth.controller");
const remote_auth_service_1 = require("./remote-auth/remote-auth.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            mail_module_1.MailModule,
            device_module_1.DeviceModule,
            session_token_module_1.SessionTokenModule,
            secret_module_1.SecretModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule
        ],
        controllers: [safe_controller_1.SafeController, item_controller_1.ItemController, key_exchange_controller_1.KeyExchangeController, remote_auth_controller_1.RemoteAuthController, key_exchange_controller_1.KeyExchangeController],
        providers: [prisma_service_1.PrismaService, secret_service_1.SecretService, device_service_1.DeviceService, session_token_service_1.SessionTokenService, safe_service_1.SafeService, key_exchange_service_1.KeyExchangeService, user_service_1.UserService, item_service_1.ItemService, remote_auth_service_1.RemoteAuthService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map