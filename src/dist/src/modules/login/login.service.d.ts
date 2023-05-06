import { JWTService } from 'auth/jwt.service';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'encryption/encryption.service';
import { LoginDTO } from './login.dto';
export declare class LoginService {
    private jwtService;
    private prisma;
    private encryptionService;
    constructor(jwtService: JWTService, prisma: PrismaService, encryptionService: EncryptionService);
    login(data: LoginDTO): Promise<string>;
}
