import { Injectable } from '@nestjs/common';
import { Approver, Prisma, PrismaClient } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class ApproverRepository {
  async getApprovers(data: Approver, dependents: boolean): Promise<Approver[]> {
    return prisma.approver
      .findMany({
        where: data,
        include: dependents ? { Dependents: true } : null,
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Approver not found', error);
      });
  }

  async getApprover(id: string, dependents: boolean): Promise<Approver> {
    return prisma.approver
      .findUnique({
        where: { id },
        include: dependents ? { Dependents: true } : null,
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Approver not found', error);
      });
  }

  async getApproverByUserId(userId: string): Promise<Approver> {
    return prisma.approver.findFirst({ where: { userId } }).catch((err) => {
      throw new PrismaException('Approver not found', err);
    });
  }

  async createApprover(userId: string): Promise<Approver> {
    return prisma.approver
      .create({ data: { userId } })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error creating approver', error);
      });
  }

  async deleteApprover(id: string): Promise<Approver> {
    return prisma.approver
      .delete({
        where: { id },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error deleting approver', error);
      });
  }
}
