import { Injectable } from '@nestjs/common';
import { Task, UserHasTask } from '@prisma/client';
import { CreateTaskDto } from './dto/task.dto';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(data);
  }

  async getTasks(data: Task): Promise<Task[]> {
    return this.taskRepository.getTasks(data);
  }
}
