import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './Game.entity';
import { PlayerStatistic } from './PlayerStatistic.entity';
@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  player_id: string;

  @ManyToMany(() => Game)
  games: Game[];

  @OneToOne(() => PlayerStatistic)
  @JoinColumn()
  statistic: PlayerStatistic;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToOne(() => Player)
  winner: Player;

  @OneToOne(() => Player)
  looser: Player;
}
