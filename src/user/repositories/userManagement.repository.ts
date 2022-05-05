import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaException } from '../exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class UserManagementRepository {
  async getUsers(data: Prisma.UserFindManyArgs): Promise<User[]> {
    return prisma.user
      .findMany(data)
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not found', error);
      });
  }

  async getUserById(id: string): Promise<User> {
    return prisma.user
      .findUnique({
        where: {
          id,
        },
        include: {
          Approvers: true,
          UserHasTask: true,
        },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not found', error);
      });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user
      .create({ data })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not created', error);
      });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user
      .update({
        where: { id },
        data,
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not updated', error);
      });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user
      .delete({
        where: { id },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not deleted', error);
      });
  }

  async getApproversByUserId(id: string): Promise<User> {
    return prisma.user
      .findUnique({
        where: {
          id,
        },
        include: {
          Approvers: { include: { approver: { include: { user: true } } } },
        },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('User not found', error);
      });
  }
}
