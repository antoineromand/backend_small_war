import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerGateway } from './server.gateway';
import { GameModule } from 'src/game/game.module';

@Module({
  providers: [ServerGateway, ServerService],
  imports: [GameModule],
})
export class ServerModule {}
