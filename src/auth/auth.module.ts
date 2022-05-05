import { Module } from '@nestjs/common';
import { UserHasTaskRepository } from '../user/repositories/user-has-task.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserHasTaskRepository],
})
export class AuthModule {}
