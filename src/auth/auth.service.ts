import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PlayerService } from 'src/player/player.service';
import { LoginDTO } from 'src/player/dto/Login.dto';
import { Player } from 'src/Model/Player.entity';

@Injectable()
export class AuthService {
  constructor(
    private playerService: PlayerService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);

    const payload = {
      userId: user.player_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: LoginDTO): Promise<Player> {
    const user = await this.playerService.findPlayerByUsername(
      userDto.username,
    );
    const isPasswordMatching = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Mauvais mot de passe !', HttpStatus.BAD_REQUEST);
    }
    user.password = undefined;
    return user;
  }
}
