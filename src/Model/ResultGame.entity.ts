import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './Game.entity';
import { Player } from './Player.entity';

@Entity()
export class ResultGame {
  @PrimaryGeneratedColumn('uuid')
  id_result_game: string;

  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;

  @OneToOne(() => Player)
  @JoinColumn()
  winner: Player;

  @OneToOne(() => Player)
  @JoinColumn()
  looser: Player;
}
