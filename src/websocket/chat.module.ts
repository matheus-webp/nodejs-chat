import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import 'reflect-metadata';

@Module({
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
