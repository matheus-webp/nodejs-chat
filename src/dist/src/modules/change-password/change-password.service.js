"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordService = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../../encryption/encryption.service");
const mail_service_1 = require("../../../mail/mail.service");
const prisma_service_1 = require("../../database/prisma.service");
let ChangePasswordService = class ChangePasswordService {
    constructor(encryptionService, emailService, prisma) {
        this.encryptionService = encryptionService;
        this.emailService = emailService;
        this.prisma = prisma;
    }
    async recoverPassword({ email }) {
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
    async changePassword(resetRequestId, newPassword) {
        if (!newPassword) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const resetRequest = await this.prisma.passwordResetRequest.findUnique({
            where: { id: resetRequestId },
            include: { User: true },
        });
        if (!resetRequest || resetRequest.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired password reset request.');
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
};
ChangePasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [encryption_service_1.EncryptionService,
        mail_service_1.EmailService,
        prisma_service_1.PrismaService])
], ChangePasswordService);
exports.ChangePasswordService = ChangePasswordService;
//# sourceMappingURL=change-password.service.js.map