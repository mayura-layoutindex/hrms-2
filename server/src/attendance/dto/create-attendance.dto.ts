import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  clock_in: string;

  @IsString()
  @IsNotEmpty()
  clock_out: string;

  @IsString()
  @IsNotEmpty()
  total_work_time: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
