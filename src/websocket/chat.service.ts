import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  handleMessage(client: Socket, payload: any): string {
    console.log('Received payload from client: ', payload);
    return 'Hello from server!';
  }
}
