import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { JWTService } from 'src/auth/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EncryptionService, JWTService],
  exports: [EncryptionService, PrismaService],
})
export class UserModule {}
