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
var Player_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const Game_entity_1 = require("./Game.entity");
const PlayerStatistic_entity_1 = require("./PlayerStatistic.entity");
let Player = Player_1 = class Player {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "player_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Game_entity_1.Game),
    __metadata("design:type", Array)
], Player.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PlayerStatistic_entity_1.PlayerStatistic),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", PlayerStatistic_entity_1.PlayerStatistic)
], Player.prototype, "statistic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Player_1),
    __metadata("design:type", Player)
], Player.prototype, "winner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Player_1),
    __metadata("design:type", Player)
], Player.prototype, "looser", void 0);
Player = Player_1 = __decorate([
    (0, typeorm_1.Entity)()
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.entity.js.map