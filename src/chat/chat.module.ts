import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthenticationMiddleware } from 'src/middleware/authentication';
import { JWTService } from 'src/auth/jwt.service';
import { UserService } from 'src/modules/user/user.service';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, AuthenticationMiddleware, JWTService, UserService],
})
export class ChatModule {}
