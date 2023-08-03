import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PunchInDto } from './dto/punch-in.dto';
import { PunchOutDto } from './dto/punch-out.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  punchIn(@Body() punchInDto: PunchInDto) {
    return this.attendanceService.punchIn(punchInDto);
  }

  @Patch(':id')
  punchOut(@Param('id') id: string) {
    return this.attendanceService.punchOut(id);
  }

  @Get()
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @Get('duration')
  findTotalDurationById(
    @Query('employeeId') employeeId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.attendanceService.findTotalDurationById(
      employeeId,
      startDate,
      endDate,
    );
  }
}
