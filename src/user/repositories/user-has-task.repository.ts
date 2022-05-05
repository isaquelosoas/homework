import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UserHasTask } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class UserHasTaskRepository {
  async createUserTask(
    data: Prisma.UserHasTaskCreateInput,
  ): Promise<UserHasTask> {
    return prisma.userHasTask
      .create({ data })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error creating user task', error);
      });
  }

  async getUserTasks(
    data: Prisma.UserHasTaskWhereInput,
  ): Promise<UserHasTask[]> {
    return prisma.userHasTask
      .findMany({
        where: data,
        include: {
          task: { include: { Category: true } },
          user: { include: { Approvers: true } },
        },
      })
      .catch((err) => {
        throw new PrismaException('User task not found', err);
      });
  }

  async getUserTasksByUserId(
    userId: string,
    filter: Prisma.UserHasTaskWhereInput,
  ): Promise<UserHasTask[]> {
    return prisma.userHasTask
      .findMany({
        where: { userId, ...filter },
        include: { task: { include: { Category: true } } },
      })
      .catch((err) => {
        throw new PrismaException('User task not found by userid', err);
      });
  }

  async getUserTaskByTaskId(taskId: string): Promise<UserHasTask> {
    return prisma.userHasTask
      .findUnique({
        where: { id: taskId },
        include: {
          user: true,
          Approver: true,
          task: { include: { Category: true } },
        },
      })
      .catch((err) => {
        throw new PrismaException('User task not found by taskid', err);
      });
  }

  async updateUserTask(
    taskId: string,
    data: Prisma.UserHasTaskUncheckedUpdateInput,
  ): Promise<UserHasTask> {
    return prisma.userHasTask
      .update({
        where: { id: taskId },
        data,
      })
      .catch((err) => {
        throw new PrismaException('User task not updated', err);
      });
  }
}
