import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserManagementRepository } from 'src/user/repositories/userManagement.repository';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
import { WithdrawRepository } from './repositories/withdraw.repository';

@Injectable()
export class WithdrawService {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
    private readonly withdrawRepository: WithdrawRepository,
  ) {}
  async withdrawMoney(data: CreateWithdrawDto) {
    const { userId, amount } = data;
    const { userBalance } = await this.userManagementRepository.getUserById(
      userId,
    );

    if (userBalance < amount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = userBalance - amount;
    const { id: withdrawId } = await this.withdrawRepository.createWithdraw({
      newBalance,
      previousBalance: userBalance,
      status: 'pending',
      ...data,
    });

    await this.userManagementRepository.updateUser(userId, {
      userBalance: newBalance,
    });

    return this.withdrawRepository.updateWithdraw(withdrawId, {
      status: 'success',
    });
  }

  async getWithdraws(data: Prisma.WithdrawWhereInput) {
    return this.withdrawRepository.getWithdraws(data);
  }
}
