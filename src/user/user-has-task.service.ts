import { Injectable } from '@nestjs/common';
import { Prisma, UserHasTask } from '@prisma/client';
import { CategoryRepository } from '../category/repositories/category.repository';
import { TimeHelper } from '../helpers/time.helper';
import { updateBalance } from '../helpers/updateBalance.helper';
import { TaskRepository } from '../task/repository/task.repository';
import { CreateUserTaskDto } from './dto/user-task.dto';
import { UserHasTaskRepository } from './repositories/user-has-task.repository';
import { UserManagementRepository } from './repositories/userManagement.repository';

@Injectable()
export class UserHasTaskService {
  constructor(
    private readonly userHasTaskRepository: UserHasTaskRepository,
    private readonly userManagementRepository: UserManagementRepository,
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async createUserTask(data: CreateUserTaskDto): Promise<UserHasTask> {
    console.log('Cirando tarefa de usuário ', data);
    const { startTime, endTime, taskId, userId, sharerId, shareAmount } = data;
    // Calcula o tempo gasto na tarefa
    console.log('Calculando tempo gasto na tarefa');
    data.timeSpent = TimeHelper.calculateTimeSpent(startTime, endTime);
    console.log('Tempo Calculado', data.timeSpent);

    //Pega o tempo médio da tarefa
    console.log('Pegando tempo médio da tarefa');
    const [{ meanTime, categoryId }] = await this.taskRepository.getTasks({
      id: taskId,
    });
    console.log('Tempo Médio da Tarefa ', meanTime);

    // Calcula o valor da tarefa de acordo com o tempo gasto e o tempo médio e seta no data.taskValue
    console.log('Calculando valor da tarefa');
    const taskValue = TimeHelper.calculateValueByAverageTime(
      meanTime,
      data.timeSpent,
    );
    data.taskValue = taskValue;
    console.log('Valor da Tarefa ', taskValue);

    // Atualiza o tempo médio da tarefa
    console.log('Atualizando tempo médio da tarefa');
    await this.taskRepository.updateTask(taskId, { meanTime: taskValue / 0.5 });

    //Verifica se a categoria necessita aprovação
    console.log('Verificando se a categoria necessita aprovação');
    const [{ needsApproval }] = await this.categoryRepository.getCategories({
      id: categoryId,
    });
    console.log('Categoria necessita aprovação ', needsApproval);

    //Verifica se usuário da tarefa é admin
    console.log('Verificando se usuário da tarefa é admin');
    const { isAdmin } =
      await this.userManagementRepository.getApproversByUserId(userId);
    console.log('Usuário da tarefa é admin ', isAdmin);

    //Se a categoria necessita aprovação e o usuário não é admin, cria uma tarefa pendente. Se não, atualiza o saldo do usuário
    if (needsApproval && !isAdmin) {
      console.log('Criando tarefa pendente');
      data.pending = true;
    } else {
      data.pending = false;
      data.approved = true;
      console.log('Atualizando saldo do usuário');
      updateBalance(userId, data.taskValue, sharerId, shareAmount);
    }

    console.log('Criando tarefa de usuário', data);
    return this.userHasTaskRepository.createUserTask(data);
  }

  async getUserTasks(data: UserHasTask): Promise<UserHasTask[]> {
    return this.userHasTaskRepository.getUserTasks(data);
  }

  async getUserTasksByUserId(
    userId: string,
    filter: Prisma.UserHasTaskWhereInput = {},
    step: string = '0',
    limit: string = '30',
  ): Promise<UserHasTask[]> {
    const skip = parseInt(step);
    const take = parseInt(limit);
    return this.userHasTaskRepository.getUserTasksByUserId(
      userId,
      filter,
      skip,
      take,
    );
  }

  async getUserTaskByTaskId(taskId: string): Promise<UserHasTask> {
    return this.userHasTaskRepository.getUserTaskByTaskId(taskId);
  }
}
