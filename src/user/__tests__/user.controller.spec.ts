import { Test, TestingModule } from '@nestjs/testing';
import { CategoryModule } from '../../category/category.module';
import { TaskModule } from '../../task/task.module';
import { UserHasTaskRepository } from '../repositories/user-has-task.repository';
import { UserManagementRepository } from '../repositories/userManagement.repository';
import { UserHasTaskService } from '../user-has-task.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserMockData } from './mocks/user.mock.data';

describe('UserController', () => {
  let userSevice: UserService;
  let userController: UserController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TaskModule, CategoryModule],
      controllers: [UserController],
      providers: [
        UserService,
        UserManagementRepository,
        UserHasTaskRepository,
        UserHasTaskService,
      ],
    }).compile();

    userSevice = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);

    userSevice.createUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userSevice.getUsers = jest.fn(() =>
      Promise.resolve([UserMockData.userData]),
    );
    userSevice.getUserById = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userSevice.updateUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userSevice.deleteUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
  });

  it('should get users list', async () => {
    const result = await userController.getUsers(UserMockData.userData);
    expect(result).toEqual([UserMockData.userData]);
  });

  it('should get user by id', async () => {
    const result = await userController.getUserById(UserMockData.userData.id);
    expect(result).toEqual(UserMockData.userData);
  });

  it('should update user', async () => {
    const result = await userController.updateUser(
      UserMockData.userData,
      UserMockData.userData.id,
    );
    expect(result).toEqual(UserMockData.userData);
  });

  it('should createUser', async () => {
    const result = await userController.createUser(
      UserMockData.createUserRequest,
    );
    expect(result).toEqual(UserMockData.userData);
  });

  it('should not create user', async () => {
    const result = await userController.createUser(
      UserMockData.createUserRequest,
    );
    expect(result).toEqual(UserMockData.userData);
  });

  it('should delete user', async () => {
    const result = await userController.deleteUser(UserMockData.userData.id);
    expect(result).toEqual(UserMockData.userData);
  });
});
