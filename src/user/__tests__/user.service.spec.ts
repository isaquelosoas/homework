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
  let userManagementRepository: UserManagementRepository;
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
    userManagementRepository = module.get<UserManagementRepository>(
      UserManagementRepository,
    );

    userManagementRepository.createUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userManagementRepository.getUsers = jest.fn(() =>
      Promise.resolve([UserMockData.userData]),
    );
    userManagementRepository.getUserById = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userManagementRepository.updateUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
    userManagementRepository.deleteUser = jest.fn(() =>
      Promise.resolve(UserMockData.userData),
    );
  });

  it('should get users list', async () => {
    const result = await userSevice.getUsers(UserMockData.userData);
    expect(result).toEqual([UserMockData.userData]);
  });

  it('should get user by id', async () => {
    const result = await userSevice.getUserById(UserMockData.userData.id);
    expect(result).toEqual(UserMockData.userData);
  });

  it('should update user', async () => {
    const result = await userSevice.updateUser(
      UserMockData.userData.id,
      UserMockData.userData,
    );
    expect(result).toEqual(UserMockData.userData);
  });

  it('should createUser', async () => {
    userManagementRepository.getUsers = jest
      .fn()
      .mockImplementation(() => Promise.resolve([]));
    const result = await userSevice.createUser(UserMockData.createUserRequest);
    expect(result).toEqual(UserMockData.userData);
  });

  it('should not createUser', async () => {
    userManagementRepository.getUsers = jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: '1',
        },
      ]),
    );
    try {
      await userSevice.createUser(UserMockData.createUserRequest);
    } catch (error) {
      expect(error.message).toEqual('User already exists');
    }
  });

  it('should delete user', async () => {
    const result = await userSevice.deleteUser(UserMockData.userData.id);
    expect(result).toEqual(UserMockData.userData);
  });
});
