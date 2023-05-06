import { BadRequestException, Injectable } from '@nestjs/common';
import { EncryptionService } from 'encryption/encryption.service';
import { EmailService } from 'mail/mail.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    private encryptionService: EncryptionService,
    private emailService: EmailService,
    private prisma: PrismaService,
  ) {}

  async recoverPassword({ email }: { email: string }) {
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    const resetRequest = await this.prisma.passwordResetRequest.create({
      data: {
        User: { connect: { id: userExists.id } },
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const resetLink = `http://localhost:3000/change-password/${resetRequest.id}`;
    return await this.emailService.sendPasswordResetEmail(email, resetLink);
  }

  async changePassword(resetRequestId: string, newPassword: string) {
    if (!newPassword) {
      throw new BadRequestException('Missing required fields');
    }

    const resetRequest = await this.prisma.passwordResetRequest.findUnique({
      where: { id: resetRequestId },
      include: { User: true },
    });

    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      throw new BadRequestException(
        'Invalid or expired password reset request.',
      );
    }

    const encryptedPassword = await this.encryptionService.encrypt(newPassword);

    await this.prisma.user.update({
      where: { id: resetRequest.User.id },
      data: {
        password: encryptedPassword,
      },
    });

    await this.prisma.passwordResetRequest.delete({
      where: { id: resetRequestId },
    });

    return { statusCode: 200, message: 'Password changed' };
  }
}
