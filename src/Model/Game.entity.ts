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
  @PrimaryGeneratedColumn('uuid')
  game_id: string;

  @ManyToMany(() => Player)
  @JoinTable()
  players: Player[];

  @OneToOne(() => ResultGame)
  result: ResultGame;

  @Column()
  game_start: Date;

  @Column({ nullable: true })
  game_end: Date;
}
