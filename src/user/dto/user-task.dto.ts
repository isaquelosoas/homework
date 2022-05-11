import { IsDateString, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateUserTaskDto {
  userId: string;
  @IsNotEmpty()
  taskId: string;
  @IsDateString()
  startTime: string;
  @IsDateString()
  endTime: string;
  timeSpent: number;
  sharerId?: string;
  pending?: boolean;
  @Max(1)
  @Min(0)
  shareAmount?: number;
  taskValue?: number;
  approved?: boolean;
  comment?: string;
  approverId?: string;
}
