import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private loginService;
    constructor(loginService: LoginService);
    login(user: LoginDTO): Promise<import("../Model/Player.entity").Player>;
    register(user: RegisterDTO): Promise<import("typeorm").ObjectLiteral>;
}
