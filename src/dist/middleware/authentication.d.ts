import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTService } from 'auth/jwt.service';
export declare class AuthenticationMiddleware implements NestMiddleware {
    private jwtService;
    constructor(jwtService: JWTService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
