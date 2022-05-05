import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Approver, UserHasApprover } from '@prisma/client';
import { ApproverService } from './approver.service';
import { CreateApproverDto } from './dto/create-approver.dto';

@Controller('approver')
export class ApproverController {
  constructor(private readonly approverService: ApproverService) {}
  @Get()
  getApprovers(@Body() body: Approver): Promise<any> {
    return this.approverService.getApprovers(body);
  }

  @Get(':approverId/dependent')
  async getApproverDependents(
    @Param('approverId') approverId: string,
  ): Promise<Approver> {
    return this.approverService.getApproverDependents(approverId);
  }

  @Post('')
  async createApprover(
    @Body() { userId, dependents }: CreateApproverDto,
  ): Promise<any> {
    return this.approverService.createApprover(userId, dependents);
  }

  @Post('/:approverId/dependent')
  async includeApproverDependent(
    @Param('approverId') approverId: string,
    @Body() { userId }: CreateApproverDto,
  ): Promise<any> {
    return this.approverService.includeApproverDependent(approverId, userId);
  }

  @Delete(':approverId')
  async deleteApprover(@Param('approverId') approverId: string): Promise<any> {
    return this.approverService.deleteApprover(approverId);
  }

  @Get('/:approverId/task/pendingApproval')
  async getPendingApprovalTasks(
    @Param('approverId') approverId: string,
  ): Promise<any> {
    return this.approverService.getPendingApprovalTasks(approverId);
  }

  @Post('/:approverId/task/:taskId/approve')
  async approveTask(
    @Param('approverId') approverId: string,
    @Param('taskId') taskId: string,
  ): Promise<any> {
    return this.approverService.approveTask(taskId, approverId);
  }

  @Post('/:approverId/task/:taskId/reject')
  async rejectTask(
    @Param('approverId') approverId: string,
    @Param('taskId') taskId: string,
  ): Promise<any> {
    return this.approverService.rejectTask(taskId, approverId);
  }
}
