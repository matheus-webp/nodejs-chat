import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async create(data: UserDTO) {
    const { password, passwordConfirmation, ...userData } = data;
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.passwordConfirmation
    ) {
      throw new BadRequestException('Missing required fields');
    }
    const userExists = await this.prisma.user.findFirst({
      where: { name: data.name, email: data.email },
    });
    if (userExists) {
      throw new BadRequestException('User with this name/email already exists');
    }
    if (password !== data.passwordConfirmation) {
      throw new BadRequestException("Passwords don't match");
    }
    const encryptedPassword = await this.encryptionService.encrypt(password);
    return this.prisma.user.create({
      data: { ...userData, password: encryptedPassword },
    });
  }

  async delete(data: UserDTO) {
    try {
      const { email } = data;
      const result = await this.prisma.user.deleteMany({ where: { email } });
      if (result.count === 0) {
        throw new NotFoundException('User not found or already deleted');
      }
      return `User with email ${email} has been deleted`;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting user: ${error.message}`,
      );
    }
  }

  async update(name: string, newName: UserDTO) {
    const strNewName = newName.name;
    if (!strNewName) {
      throw new BadRequestException('Missing required fields');
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { name: strNewName },
    });
    if (existingUser) {
      throw new ConflictException('Name already taken');
    }
    return await this.prisma.user.update({
      where: { name },
      data: { name: strNewName },
    });
  }
}
