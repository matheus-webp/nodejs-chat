import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDTO } from './login.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() data: LoginDTO) {
    try {
      return await this.loginService.login(data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { message: 'Invalid request', details: error.message };
      }

      return { message: 'Unexpected error', details: error.message };
    }
  }
}
