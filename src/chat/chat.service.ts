import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async findChat(participants: string[]) {
    return await this.prisma.chat.findFirst({
      where: {
        userIds: {
          hasEvery: participants,
        },
      },
    });
  }

  async createChat(participants: string[]) {
    return await this.prisma.chat.create({
      data: { users: { connect: participants.map((id) => ({ id })) } },
    });
  }

  async createMessage(participants: string[], content: string) {
    let chat = await this.findChat(participants);
    if (!chat) chat = await this.createChat(participants);
    await this.prisma.message.create({
      data: {
        chat: { connect: { id: chat.id } },
        content,
        from: participants[0],
        to: participants[1],
      },
    });
  }
}
