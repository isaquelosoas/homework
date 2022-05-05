import { IsNotEmpty } from 'class-validator';

export class CreateApproverDto {
  @IsNotEmpty()
  userId: string;

  dependents?: string[];
}
