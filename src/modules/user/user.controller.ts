import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Delete, Patch } from '@nestjs/common';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO) {
    try {
      return this.userService.create(data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete()
  async delete(@Body() data: UserDTO) {
    try {
      const result = await this.userService.delete(data);
      return { message: result };
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.message,
          error.response.statusCode,
        );
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() newName: UserDTO) {
    try {
      return await this.userService.update(name, newName);
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.message,
          error.response.statusCode,
        );
      }
    }
  }
}
