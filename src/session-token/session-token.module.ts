import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretService } from 'src/secret/secret.service';
import { UserService } from 'src/user/user.service';

@Module({
    providers: [UserService, PrismaService, SecretService],
    exports: [UserService, PrismaService, SecretService],
})
export class SessionTokenModule {}
