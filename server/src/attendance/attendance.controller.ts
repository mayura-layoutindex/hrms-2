import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  punchOut(@Param('id') id: string, @Body() punchOutDto: PunchOutDto) {
    return this.attendanceService.punchOut(id, punchOutDto);
  }

  @Get('get-total-duration')
  findTotalDurationById(
    @Body() employeeId: string,
    @Body() startDate: string,
    @Body() endDate: string,
  ) {
    console.log(employeeId);

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
