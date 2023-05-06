import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: UserDTO): Promise<import(".prisma/client").User>;
    delete(data: UserDTO): Promise<{
        message: string;
    }>;
    update(name: string, newName: UserDTO): Promise<import(".prisma/client").User>;
}
