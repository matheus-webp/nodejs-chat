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
import { ChatService } from './chat.service';

type Message = {
  to: string;
  from: string;
  content: string;
};

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private userIdToSocketId: { [key: string]: string } = {};
  constructor(
    private readonly auth: AuthenticationMiddleware,
    private readonly user: UserService,
    private chatService: ChatService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization;
      const { id } = await this.auth.verifyConnection(token);
      const user = await this.user.findOne({ id });
      this.userIdToSocketId[user.id] = socket.id;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        socket.emit('error', 'Unauthorized');
        socket.disconnect();
      }
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }

  @SubscribeMessage('private-message')
  async handlePrivateMessage(
    @MessageBody()
    { from, to, content }: Message,
  ) {
    const socketId = this.userIdToSocketId[to];
    await this.chatService.createMessage([from, to], content);
    this.server.to(socketId).emit('message', content);
  }
}
