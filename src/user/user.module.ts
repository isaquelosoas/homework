import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { TaskModule } from '../task/task.module';
import { UserHasTaskRepository } from './repositories/user-has-task.repository';
import { UserManagementRepository } from './repositories/userManagement.repository';
import { UserHasTaskService } from './user-has-task.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TaskModule, CategoryModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserManagementRepository,
    UserHasTaskRepository,
    UserHasTaskService,
  ],
  exports: [UserManagementRepository, UserHasTaskRepository],
})
export class UserModule {}
