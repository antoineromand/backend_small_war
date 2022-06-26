import { WebSocketGateway } from '@nestjs/websockets';
import { ServerService } from './server.service';

@WebSocketGateway()
export class ServerGateway {
  constructor(private readonly serverService: ServerService) {}
}
