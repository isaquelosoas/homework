import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UserHasApprover } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class UserHasApproverRepository {
  async getUserHasApprover(
    approverId: string,
    userId: string,
  ): Promise<UserHasApprover> {
    return prisma.userHasApprover
      .findFirst({ where: { approverId, userId } })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error getting approver dependents ', error);
      });
  }

  async setUserHasApprover(
    userId: string,
    approverId: string,
  ): Promise<UserHasApprover> {
    return prisma.userHasApprover
      .create({ data: { userId, approverId } })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error creating approver dependents', error);
      });
  }

  async deleteApprover(approverId: string): Promise<Prisma.BatchPayload> {
    return prisma.userHasApprover
      .deleteMany({
        where: { approverId },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error deleting approver dependents', error);
      });
  }

  async getApproverDependents(approverId: string): Promise<UserHasApprover[]> {
    return prisma.userHasApprover
      .findMany({
        where: { approverId },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error getting approver dependents', error);
      });
  }
}
