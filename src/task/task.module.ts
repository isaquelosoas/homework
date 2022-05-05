import { Module } from '@nestjs/common';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule {}
