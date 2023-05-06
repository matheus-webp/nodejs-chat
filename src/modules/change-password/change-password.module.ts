import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EmailService } from 'src/mail/mail.service';
import { ChangePasswordController } from './change-password.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ChangePasswordService } from './change-password.service';

@Module({
  controllers: [ChangePasswordController],
  providers: [
    EncryptionService,
    EmailService,
    PrismaService,
    ChangePasswordService,
  ],
})
export class ChangePasswordModule {}
