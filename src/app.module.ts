import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { AuthenticationMiddleware } from 'src/middleware/authentication';
import { JWTService } from 'src/auth/jwt.service';
import { EmailService } from 'src/mail/mail.service';
import { ChangePasswordModule } from './modules/change-password/change-password.module';
import { ChatModule } from './websocket/chat.module';

@Module({
  imports: [UserModule, LoginModule, ChangePasswordModule, ChatModule],
  providers: [JWTService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.DELETE },
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'recover-password', method: RequestMethod.POST },
        { path: 'change-password', method: RequestMethod.PATCH },
      );
  }
}
