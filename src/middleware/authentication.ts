import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTService } from 'auth/jwt.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtService: JWTService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new BadRequestException('Not authorized');
    }

    const token = authHeader.substring(7);
    const isValidToken = await this.jwtService.verify(token);
    if (!isValidToken) {
      throw new BadRequestException('Invalid token');
    }
    next();
  }
}
