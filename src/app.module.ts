import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SafeController } from './safe/safe.controller';
import { ItemController } from './item/item.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';
import { SecretService } from './secret/secret.service';
import { DeviceService } from './device/device.service';
import { DeviceModule } from './device/device.module';
import { SecretModule } from './secret/secret.module';
import { PrismaModule } from './prisma/prisma.module';
import { SafeService } from './safe/safe.service';
import { UserService } from './user/user.service';
import { ItemService } from './item/item.service';
import { UserController } from './user/user.controller';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailModule,
    DeviceModule,
    SecretModule,
    PrismaModule
  ],
  controllers: [SafeController, ItemController, UserController],
  providers: [PrismaService, SecretService, DeviceService, SafeService, UserService, ItemService, RefreshTokenService]
})
export class AppModule { }
