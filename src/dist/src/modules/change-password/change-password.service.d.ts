import { EncryptionService } from 'encryption/encryption.service';
import { EmailService } from 'mail/mail.service';
import { PrismaService } from 'src/database/prisma.service';
export declare class ChangePasswordService {
    private encryptionService;
    private emailService;
    private prisma;
    constructor(encryptionService: EncryptionService, emailService: EmailService, prisma: PrismaService);
    recoverPassword({ email }: {
        email: string;
    }): Promise<any>;
    changePassword(resetRequestId: string, newPassword: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
