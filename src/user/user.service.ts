import { Injectable } from '@nestjs/common';
import { Prisma, User, UserHasTask } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { createUserData, findUserData } from './mappers/createUser.mapper';
import { UserManagementRepository } from './repositories/userManagement.repository';
import { PasswordHelper } from '../helpers/password.helper';
import { UserHasTaskRepository } from './repositories/user-has-task.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
    private readonly userHasTaskRepository: UserHasTaskRepository,
  ) {}

  async createUser(body: CreateUserDto) {
    const data = createUserData(body);

    const password = PasswordHelper.hashPassword(data.password);
    data.password = password;

    const [hasUser] = await this.userManagementRepository.getUsers({
      where: { email: data.email },
    });

    if (!hasUser) {
      return this.userManagementRepository.createUser(data);
    } else {
      throw new Error('User already exists');
    }
  }

  getUsers(body: Prisma.UserCreateInput) {
    const data = findUserData(body);
    return this.userManagementRepository.getUsers(data);
  }

  getUserById(id: string) {
    return this.userManagementRepository.getUserById(id);
  }

  async getApproversByUserId(userId: string): Promise<User> {
    return this.userManagementRepository.getApproversByUserId(userId);
  }

  updateUser(id: string, body: Prisma.UserUpdateInput) {
    return this.userManagementRepository.updateUser(id, body);
  }

  deleteUser(id: string) {
    return this.userManagementRepository.deleteUser(id);
  }
}
