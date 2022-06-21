import { Player } from 'src/Model/Player.entity';
import { PlayerStatistic } from 'src/Model/PlayerStatistic.entity';
import { InsertResult, ObjectLiteral, Repository } from 'typeorm';
import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';
export declare class LoginService {
    private playerRepository;
    private playerStatisticsRepository;
    constructor(playerRepository: Repository<Player>, playerStatisticsRepository: Repository<PlayerStatistic>);
    login(userLoginInfo: LoginDTO): Promise<Player>;
    register(user: RegisterDTO): Promise<ObjectLiteral>;
    initStats(): Promise<InsertResult>;
}
