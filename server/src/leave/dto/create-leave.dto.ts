import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  leave_id: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  leave_type: string;

  @IsNotEmpty()
  applied_date: Date;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  no_of_date: number;

  @IsNotEmpty()
  approved_by: string;

  @IsNotEmpty()
  description: string;
}
