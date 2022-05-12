import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WithdrawRepository } from './repositories/withdraw.repository';
import { WithdrawController } from './withdraw.controller';
import { WithdrawService } from './withdraw.service';

@Module({
  imports: [UserModule],
  controllers: [WithdrawController],
  providers: [WithdrawRepository, WithdrawService],
})
export class WithdrawModule {}
