import { ChangePasswordService } from './change-password.service';
interface RecoverPasswordDTO {
    email: string;
}
interface PasswordData {
    newPassword: string;
}
export declare class ChangePasswordController {
    private changePasswordService;
    constructor(changePasswordService: ChangePasswordService);
    recoverPassword(email: RecoverPasswordDTO): Promise<any>;
    changePassword(resetRequestId: string, newPassword: PasswordData): Promise<void>;
}
export {};
