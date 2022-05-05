import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Task } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class TaskRepository {
  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task
      .create({ data })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error creating task', error);
      });
  }

  async getTasks(data: Prisma.TaskWhereInput): Promise<Task[]> {
    return prisma.task
      .findMany({ where: data, include: { Category: true, UserHasTask: true } })
      .catch((err) => {
        throw new PrismaException('Task not found', err);
      });
  }

  async updateTask(
    taskId: string,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return prisma.task
      .update({
        where: { id: taskId },
        data,
      })
      .catch((err) => {
        throw new PrismaException('Task not updated', err);
      });
  }
}
