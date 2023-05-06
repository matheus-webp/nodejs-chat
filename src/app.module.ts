import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { AuthenticationMiddleware } from 'middleware/authentication';
import { JWTService } from 'auth/jwt.service';
import { EmailService } from 'mail/mail.service';
import { ChangePasswordModule } from './modules/change-password/change-password.module';

@Module({
  imports: [UserModule, LoginModule, ChangePasswordModule],
  controllers: [],
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
