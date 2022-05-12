import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}
  @Post('')
  async withdrawMoney(@Body() data: CreateWithdrawDto): Promise<any> {
    return this.withdrawService.withdrawMoney(data);
  }

  @Get()
  async getWithdraws(@Body() body: Prisma.WithdrawWhereInput): Promise<any> {
    return this.withdrawService.getWithdraws(body);
  }
}
