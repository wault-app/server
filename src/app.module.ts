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
import { UserModule } from './user/user.module';
import { KeyExchangeController } from './key-exchange/key-exchange.controller';
import { ItemService } from './item/item.service';

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
    PrismaModule,
    UserModule
  ],
  controllers: [SafeController, ItemController, KeyExchangeController],
  providers: [PrismaService, SecretService, DeviceService, SessionTokenService, SafeService, KeyExchangeService, UserService, ItemService]
})
export class AppModule { }
