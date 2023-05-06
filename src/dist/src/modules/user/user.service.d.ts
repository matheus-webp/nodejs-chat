import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'encryption/encryption.service';
export declare class UserService {
    private prisma;
    private encryptionService;
    constructor(prisma: PrismaService, encryptionService: EncryptionService);
    create(data: UserDTO): Promise<import(".prisma/client").User>;
    delete(data: UserDTO): Promise<string>;
    update(name: string, newName: UserDTO): Promise<import(".prisma/client").User>;
}
