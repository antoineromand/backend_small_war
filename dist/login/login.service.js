"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Player_entity_1 = require("../Model/Player.entity");
const PlayerStatistic_entity_1 = require("../Model/PlayerStatistic.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let LoginService = class LoginService {
    constructor(playerRepository, playerStatisticsRepository) {
        this.playerRepository = playerRepository;
        this.playerStatisticsRepository = playerStatisticsRepository;
    }
    async login(userLoginInfo) {
        const user = await this.playerRepository.findOne({
            where: { username: userLoginInfo.username },
        });
        if (user === undefined || user === null) {
            throw new common_1.HttpException('Pseudo incorrecte !', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const isPasswordMatching = await bcrypt.compare(userLoginInfo.password, user.password);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Mauvais mot de passe !', common_1.HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        }
    }
    async register(user) {
        const userExist = await this.playerRepository.findOne({
            where: { username: user.username },
        });
        const emailExist = await this.playerRepository.findOne({
            where: { email: user.email },
        });
        if (userExist !== null && emailExist !== null) {
            console.log('ça existe ??');
            throw new common_1.HttpException('Pseudo ou email déja choisi !', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const idStats = await (await this.initStats()).generatedMaps[0].player_statistic_id;
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = await this.playerRepository
                .createQueryBuilder()
                .insert()
                .into(Player_entity_1.Player)
                .values({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                statistic: idStats,
            })
                .execute();
            return newUser.generatedMaps[0];
        }
    }
    async initStats() {
        return await this.playerStatisticsRepository
            .createQueryBuilder()
            .insert()
            .into(PlayerStatistic_entity_1.PlayerStatistic)
            .values({})
            .execute();
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Player_entity_1.Player)),
    __param(1, (0, typeorm_1.InjectRepository)(PlayerStatistic_entity_1.PlayerStatistic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map