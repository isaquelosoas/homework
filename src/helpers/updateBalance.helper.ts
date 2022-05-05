import { UserManagementRepository } from '../user/repositories/userManagement.repository';

export async function updateBalance(
  userId: string,
  taskValue: number,
  sharerId: string = '',
  shareAmount: number = 0,
): Promise<any> {
  const userManagementRepository = new UserManagementRepository();
  if (sharerId) {
    const [userPercentage, sharerPercentage] = shareValue(
      shareAmount,
      taskValue,
    );

    const { userBalance } = await userManagementRepository.getUserById(userId);
    const { userBalance: sharerBalance } =
      await userManagementRepository.getUserById(sharerId);

    await userManagementRepository.updateUser(userId, {
      userBalance: userBalance + userPercentage,
    });
    await userManagementRepository.updateUser(sharerId, {
      userBalance: sharerBalance + sharerPercentage,
    });
  } else {
    const { userBalance } = await userManagementRepository.getUserById(userId);
    await userManagementRepository.updateUser(userId, {
      userBalance: userBalance + taskValue,
    });
  }
}

function shareValue(shareAmount: number, taskValue: number): number[] {
  if (shareAmount < 1) {
    const userPercentage = 1 - shareAmount;
    return [userPercentage * taskValue, shareAmount * taskValue];
  }
  return [taskValue - shareAmount, shareAmount];
}
