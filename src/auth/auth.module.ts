import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { DeviceModule } from 'src/device/device.module';
import { MailModule } from 'src/mail/mail.module';
import { SessionTokenModule } from 'src/session-token/session-token.module';
import { SessionTokenService } from 'src/session-token/session-token.service';
import { DeviceService } from 'src/device/device.service';
import { SecretModule } from 'src/secret/secret.module';

@Module({
  imports: [MailModule, SecretModule, DeviceModule, SessionTokenModule],
  providers: [AuthService, MailService, DeviceService, SessionTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
