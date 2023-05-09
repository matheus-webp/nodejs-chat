import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTService } from 'src/auth/jwt.service';

type Payload = {
  id: string;
};

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtService: JWTService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Not authorized');
    }

    const token = authHeader.substring(7);
    const isValidToken = await this.jwtService.verify(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }

  async verifyConnection(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Not authorized');
    }

    const token = authHeader.substring(7);

    const payload = (await this.jwtService.verify(token)) as Payload;
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
