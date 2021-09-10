import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { DeviceModule } from 'src/device/device.module';
import { MailModule } from 'src/mail/mail.module';
import { DeviceService } from 'src/device/device.service';
import { SecretModule } from 'src/secret/secret.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

@Module({
  imports: [
    MailModule,
    SecretModule,
    DeviceModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60,
        issuer: "server.wault.app",
      },
    })
  ],
  providers: [
    AuthService,
    MailService,
    DeviceService,
    PrismaService,
    JwtStrategy,
    RefreshTokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
