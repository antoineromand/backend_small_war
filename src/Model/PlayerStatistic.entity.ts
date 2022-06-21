import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './Player.entity';

@Entity()
export class PlayerStatistic {
  @PrimaryGeneratedColumn()
  player_statistic_id: number;

  @Column({ default: 0 })
  win: number;

  @Column({ default: 0 })
  loose: number;

  @Column({ default: 0 })
  games: number;

  @OneToOne(() => Player)
  player: Player;
}
