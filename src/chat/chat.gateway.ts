import { UnauthorizedException } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticationMiddleware } from 'src/middleware/authentication';
import { UserService } from 'src/modules/user/user.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private socketIdToUserId: { [key: string]: string } = {};
  constructor(
    private readonly auth: AuthenticationMiddleware,
    private readonly user: UserService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization;
      const { id } = await this.auth.verifyConnection(token);
      const user = await this.user.findOne({ id });
      this.socketIdToUserId[socket.id] = user.id;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        socket.emit('error', 'Unauthorized');
        socket.disconnect();
      }
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    this.server.emit('message', data);
  }
}
