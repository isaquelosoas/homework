import { IsNotEmpty } from 'class-validator';

export class CreateWithdrawDto {
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  userId: string;
}
