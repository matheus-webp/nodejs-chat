import { BadRequestException, Injectable } from '@nestjs/common';
import { JWTService } from 'src/auth/jwt.service';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { LoginDTO } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JWTService,
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async login(data: LoginDTO) {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValidPassword = await this.encryptionService.compare(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.jwtService.generate(existingUser.id);
    return { token };
  }
}
