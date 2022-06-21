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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatistic = void 0;
const typeorm_1 = require("typeorm");
const Player_entity_1 = require("./Player.entity");
let PlayerStatistic = class PlayerStatistic {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlayerStatistic.prototype, "player_statistic_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlayerStatistic.prototype, "win", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlayerStatistic.prototype, "loose", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlayerStatistic.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Player_entity_1.Player),
    __metadata("design:type", Player_entity_1.Player)
], PlayerStatistic.prototype, "player", void 0);
PlayerStatistic = __decorate([
    (0, typeorm_1.Entity)()
], PlayerStatistic);
exports.PlayerStatistic = PlayerStatistic;
//# sourceMappingURL=PlayerStatistic.entity.js.map