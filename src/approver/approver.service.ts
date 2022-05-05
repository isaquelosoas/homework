import { Injectable } from '@nestjs/common';
import { Approver, User, UserHasApprover, UserHasTask } from '@prisma/client';
import { updateBalance } from '../helpers/updateBalance.helper';
import { UserHasTaskRepository } from '../user/repositories/user-has-task.repository';
import { UserManagementRepository } from '../user/repositories/userManagement.repository';
import { ApproverRepository } from './repositories/approver.repository';
import { UserHasApproverRepository } from './repositories/user-has-approver.repository';

@Injectable()
export class ApproverService {
  constructor(
    private readonly approverRepository: ApproverRepository,
    private readonly userHasApproverRepository: UserHasApproverRepository,
    private readonly userManagementRepository: UserManagementRepository,
    private readonly userHasTaskRepository: UserHasTaskRepository,
  ) {}

  async getApprovers(
    body: Approver,
    dependents: boolean = false,
  ): Promise<Approver[]> {
    return this.approverRepository.getApprovers(body, dependents);
  }

  async getApproverDependents(id: string): Promise<Approver> {
    return this.approverRepository.getApprover(id, true);
  }

  async createApprover(
    userId: string,
    dependents: string[] = [],
  ): Promise<any> {
    const isUserApprover = await this.approverRepository.getApproverByUserId(
      userId,
    );

    if (isUserApprover) {
      throw new Error('User is already an approver');
    }

    const { id: approverId, ...approverData } =
      await this.approverRepository.createApprover(userId);

    await this.userManagementRepository.updateUser(userId, {
      isApprover: true,
      approverId,
    });

    const notIncludedDependents = [];

    dependents.forEach(async (dependent) => {
      const userExists = await this.userManagementRepository
        .getUserById(dependent)
        .catch(() => {
          notIncludedDependents.push(dependent);
          return false;
        });
      if (userExists) {
        await this.includeApproverDependent(approverId, dependent).catch(() => {
          notIncludedDependents.push(dependent);
        });
      }
    });

    return { approverId, approverData, notIncludedDependents };
  }

  async deleteApprover(id: string): Promise<any> {
    await this.userHasApproverRepository.deleteApprover(id);

    await this.userManagementRepository.updateUser(id, {
      isApprover: false,
    });

    return this.approverRepository.deleteApprover(id);
  }

  async includeApproverDependent(approverId: string, dependentId: string) {
    const hasIncludedDependent =
      await this.userHasApproverRepository.getUserHasApprover(
        approverId,
        dependentId,
      );

    if (!hasIncludedDependent) {
      this.userHasApproverRepository.setUserHasApprover(
        dependentId,
        approverId,
      );
    }
    return { status: 'success' };
  }

  async getPendingApprovalTasks(approverId: string): Promise<UserHasTask[]> {
    return this.userHasTaskRepository.getUserTasks({
      AND: [
        {
          user: {
            Approvers: {
              some: {
                approverId,
              },
            },
          },
        },
        {
          task: {
            Category: {
              needsApproval: true,
            },
          },
        },
        {
          approved: false,
          pending: true,
        },
      ],
    });
  }

  async approveTask(taskId: string, approverId: string): Promise<any> {
    await this.checkPendingStatus(taskId);
    const { userId, taskValue, sharerId, shareAmount } =
      await this.userHasTaskRepository.updateUserTask(taskId, {
        approved: true,
        pending: false,
        approverId,
      });
    updateBalance(userId, taskValue, sharerId, shareAmount);
    return { status: 'success' };
  }

  async rejectTask(taskId: string, approverId: string): Promise<any> {
    await this.checkPendingStatus(taskId);
    await this.userHasTaskRepository.updateUserTask(taskId, {
      pending: false,
      approverId,
    });
    return { status: 'success' };
  }

  private async checkPendingStatus(taskId: string): Promise<void> {
    const { pending } = await this.userHasTaskRepository.getUserTaskByTaskId(
      taskId,
    );
    console.log(pending);
    if (!pending) {
      throw new Error('Task is already approved or rejected');
    }
  }
}
