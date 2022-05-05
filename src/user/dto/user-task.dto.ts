import {
  IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @MaxLength(1)
  @MinLength(0)
  shareAmount?: number;
  taskValue?: number;
  approved?: boolean;
  comment?: string;
  approverId?: string;
}
