import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'encryption/encryption.service';
import { JWTService } from 'auth/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EncryptionService, JWTService],
})
export class UserModule {}
