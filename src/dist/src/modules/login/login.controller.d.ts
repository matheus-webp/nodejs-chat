import { LoginService } from './login.service';
import { LoginDTO } from './login.dto';
export declare class LoginController {
    private loginService;
    constructor(loginService: LoginService);
    login(data: LoginDTO): Promise<string | {
        message: string;
        details: any;
    }>;
}
