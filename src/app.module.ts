import { Module } from '@nestjs/common';
import { SafeController } from './safe/safe.controller';
import { ItemController } from './item/item.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';
import { SecretService } from './secret/secret.service';
import { DeviceService } from './device/device.service';
import { SessionTokenService } from './session-token/session-token.service';
import { DeviceModule } from './device/device.module';
import { SessionTokenModule } from './session-token/session-token.module';
import { SecretModule } from './secret/secret.module';
import { PrismaModule } from './prisma/prisma.module';
import { SafeService } from './safe/safe.service';
import { KeyExchangeService } from './key-exchange/key-exchange.service';
import { UserService } from './user/user.service';
import { KeyExchangeController } from './key-exchange/key-exchange.controller';
import { ItemService } from './item/item.service';
import { RemoteAuthController } from './remote-auth/remote-auth.controller';
import { RemoteAuthService } from './remote-auth/remote-auth.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailModule,
    DeviceModule,
    SessionTokenModule,
    SecretModule,
    PrismaModule
  ],
  controllers: [SafeController, ItemController, KeyExchangeController, RemoteAuthController, KeyExchangeController, UserController],
  providers: [PrismaService, SecretService, DeviceService, SessionTokenService, SafeService, KeyExchangeService, UserService, ItemService, RemoteAuthService]
})
export class AppModule { }
