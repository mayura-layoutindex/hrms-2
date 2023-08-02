import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get()
  findAll() {
    return this.attendanceService.findAllAttendances();
  }

  @Patch(':id')
  punchOut(@Param('id') id: string, @Body() punchOutDto: PunchOutDto) {
    return this.attendanceService.punchOut(id, punchOutDto);
  }

  @Get('duration')
  findTotalDurationById(
    @Query('employeeId') employeeId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log(employeeId, startDate, endDate);

    return this.attendanceService.findTotalDurationById(
      employeeId,
      startDate,
      endDate,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
