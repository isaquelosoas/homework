import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class WithdrawRepository {
  async createWithdraw(data: Prisma.WithdrawCreateInput) {
    return prisma.withdraw
      .create({
        data,
      })
      .catch((err) => {
        throw new PrismaException('Error creating withdraw', err);
      });
  }

  async getWithdraws(data: Prisma.WithdrawWhereInput) {
    return prisma.withdraw
      .findMany({
        where: data,
      })
      .catch((err) => {
        throw new PrismaException('Error getting withdraw', err);
      });
  }

  async updateWithdraw(id: string, data: Prisma.WithdrawUpdateInput) {
    return prisma.withdraw
      .update({
        where: {
          id,
        },
        data,
      })
      .catch((err) => {
        throw new PrismaException('Error updating withdraw', err);
      });
  }
}
