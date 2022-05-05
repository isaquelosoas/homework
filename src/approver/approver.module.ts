import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ApproverController } from './approver.controller';
import { ApproverService } from './approver.service';
import { ApproverRepository } from './repositories/approver.repository';
import { UserHasApproverRepository } from './repositories/user-has-approver.repository';

@Module({
  imports: [UserModule],
  controllers: [ApproverController],
  providers: [ApproverService, ApproverRepository, UserHasApproverRepository],
})
export class ApproverModule {}
