import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApproverModule } from './approver/approver.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { WithdrawModule } from './withdraw/withdraw.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApproverModule,
    CategoryModule,
    TaskModule,
    WithdrawModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/(.*)').forRoutes('*');
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: 'category', method: RequestMethod.POST },
        { path: 'task', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.POST },
        { path: 'user/:id', method: RequestMethod.DELETE },
        { path: 'approver', method: RequestMethod.POST },
      );
  }
}
