import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  createTask(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  @Get()
  getTasks(@Body() data: Task) {
    return this.taskService.getTasks(data);
  }
}
