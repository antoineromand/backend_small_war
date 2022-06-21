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
exports.ResultGame = void 0;
const typeorm_1 = require("typeorm");
const Game_entity_1 = require("./Game.entity");
const Player_entity_1 = require("./Player.entity");
let ResultGame = class ResultGame {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResultGame.prototype, "id_result_game", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Game_entity_1.Game),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Game_entity_1.Game)
], ResultGame.prototype, "game", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Player_entity_1.Player),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Player_entity_1.Player)
], ResultGame.prototype, "winner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Player_entity_1.Player),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Player_entity_1.Player)
], ResultGame.prototype, "looser", void 0);
ResultGame = __decorate([
    (0, typeorm_1.Entity)()
], ResultGame);
exports.ResultGame = ResultGame;
//# sourceMappingURL=ResultGame.entity.js.map