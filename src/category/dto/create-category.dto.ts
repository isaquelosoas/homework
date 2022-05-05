import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  needsApproval?: boolean;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}
