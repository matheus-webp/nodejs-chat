import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PrismaService } from 'src/database/prisma.service';
import { JWTService } from 'src/auth/jwt.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, PrismaService, JWTService, EncryptionService],
})
export class LoginModule {}
