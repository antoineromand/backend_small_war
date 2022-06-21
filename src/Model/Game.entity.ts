import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from './Player.entity';
import { ResultGame } from './ResultGame.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  game_id: number;

  @ManyToMany(() => Player)
  @JoinTable()
  players: Player[];

  @OneToOne(() => ResultGame)
  result: ResultGame;

  @Column()
  game_start: Date;

  @Column()
  game_end: Date;
}
