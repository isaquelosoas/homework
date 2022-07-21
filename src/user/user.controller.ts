import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma, UserHasTask } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserTaskDto } from './dto/user-task.dto';
import { UserHasTaskService } from './user-has-task.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userHasTaskService: UserHasTaskService,
  ) {}
  @Get('')
  getUsers(@Body() body: Prisma.UserCreateInput) {
    return this.userService.getUsers(body);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/:userId/approvers')
  async getApproversByUserId(@Param('userId') userId: string): Promise<any> {
    return this.userService.getApproversByUserId(userId);
  }

  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Put('/:id')
  updateUser(@Body() body: Prisma.UserUpdateInput, @Param('id') id: string) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('/:userId/task')
  async createUserTask(
    @Param('userId') userId: string,
    @Body() body: CreateUserTaskDto,
  ): Promise<UserHasTask> {
    body.userId = userId;
    return this.userHasTaskService.createUserTask(body);
  }

  @Get('/:userId/task')
  async getUserTasks(
    @Param('userId') userId: string,
    @Query() { skip, limit },
    @Body() body: Prisma.UserHasTaskWhereInput = {},
  ): Promise<UserHasTask[]> {
    return this.userHasTaskService.getUserTasksByUserId(
      userId,
      body,
      skip,
      limit,
    );
  }

  @Get('/:userId/task/pendingApproval')
  async GetPendingApprovalUserTask(
    @Param('userId') userId: string,
  ): Promise<UserHasTask[]> {
    return this.userHasTaskService.getUserTasksByUserId(userId, {
      AND: [
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

  @Get('/task/:taskId')
  async getUserTaskByTaskId(
    @Param('taskId') taskId: string,
  ): Promise<UserHasTask> {
    return this.userHasTaskService.getUserTaskByTaskId(taskId);
  }
}
