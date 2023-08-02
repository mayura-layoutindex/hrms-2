import { IsNotEmpty, IsString } from 'class-validator';

export class PunchInDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  clock_in: Date;

  @IsString()
  clock_out: Date;

  @IsString()
  @IsNotEmpty()
  total_work_time: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
