import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../../category/repositories/category.repository';
import { CategoryModule } from '../../category/category.module';
import { TaskModule } from '../../task/task.module';
import { UserHasTaskRepository } from '../repositories/user-has-task.repository';
import { UserManagementRepository } from '../repositories/userManagement.repository';
import { UserHasTaskService } from '../user-has-task.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { TaskRepository } from '../../task/repository/task.repository';
import { TaskMock } from './mocks/task.mock.data';
import { CategoryMock } from './mocks/category.mock.data';

describe('UserHasTaskService', () => {
  let userHasTaskRepository: UserHasTaskRepository;
  let userManagementRepository: UserManagementRepository;
  let taskRepository: TaskRepository;
  let categoryRepository: CategoryRepository;

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

    userHasTaskRepository = module.get<UserHasTaskRepository>(
      UserHasTaskRepository,
    );
    userManagementRepository = module.get<UserManagementRepository>(
      UserManagementRepository,
    );
    taskRepository = module.get<TaskRepository>(TaskRepository);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    taskRepository.getTasks = jest.fn(() =>
      Promise.resolve([TaskMock.taskResponse]),
    );

    taskRepository.updateTask = jest.fn(() =>
      Promise.resolve(TaskMock.taskResponse),
    );

    categoryRepository.getCategories = jest.fn(() =>
      Promise.resolve([CategoryMock.categoryResponse]),
    );
  });
});
