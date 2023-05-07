import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

import 'reflect-metadata';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
