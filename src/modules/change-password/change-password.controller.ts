import {
  Controller,
  Body,
  Post,
  BadRequestException,
  Param,
  Patch,
} from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';

interface RecoverPasswordDTO {
  email: string;
}

interface PasswordData {
  newPassword: string;
}

@Controller()
export class ChangePasswordController {
  constructor(private changePasswordService: ChangePasswordService) {}

  @Post('recover-password')
  async recoverPassword(@Body() email: RecoverPasswordDTO) {
    try {
      return await this.changePasswordService.recoverPassword(email);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch('change-password/:resetRequestId')
  async changePassword(
    @Param('resetRequestId') resetRequestId: string,
    @Body() newPassword: PasswordData,
  ) {
    await this.changePasswordService.changePassword(
      resetRequestId,
      newPassword.newPassword,
    );
  }
}
