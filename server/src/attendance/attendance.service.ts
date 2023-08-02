import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PunchInDto } from './dto/punch-in.dto';
import { PunchOutDto } from './dto/punch-out.dto';
import { DataSource, EntityManager, Between, Not, IsNull } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

@Injectable()
export class AttendanceService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async punchIn(punchInDto: PunchInDto) {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const punchIn = await this.manager.create(Attendance, {
        employee_id: punchInDto.employee_id,
        date: formattedDate,
        clock_in: new Date(),
        clock_out: null,
        total_work_time: null,
      });

      await this.manager.save(Attendance, punchIn);

      return { msg: 'Attendance created successfully', punchIn };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async punchOut(attendance_id: string, punchOutDto: PunchOutDto) {
    try {
      const attend = await this.manager.findOne(Attendance, {
        where: { attendance_id },
      });

      if (!attend) {
        throw new Error('Attendance not found');
      }

      if (attend.clock_out === null && attend.total_work_time === null) {
        const clockIn = dayjs(attend.clock_in);
        const currentClockOutTime = new Date();
        const clockOut = dayjs(currentClockOutTime);

        const totalWorkTime = dayjs.duration(clockOut.diff(clockIn));
        const isoTotalWorkTime = totalWorkTime.toISOString();

        attend.clock_out = currentClockOutTime;
        attend.total_work_time = isoTotalWorkTime;

        await this.manager.save(attend);

        return { msg: 'Punched out successfully' };
      } else {
        return { status: 409, error: 'Already punched out' };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllAttendances() {
    try {
      const attendances = await this.manager.find(Attendance);

      if (attendances.length === 0) {
        throw new Error('Data is not found');
      }

      return { msg: 'Get data successfully', data: attendances };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findTotalDurationById(
    employee_id: string,
    start_date: string,
    end_date: string,
  ) {
    console.log(employee_id, start_date, end_date);

    // try {
    //   const attends = await this.manager.find(Attendance, {
    //     where: {
    //       employee_id,
    //       clock_in: Between(start_date, end_date),
    //       clock_out: Not(IsNull()),
    //     },
    //   });

    //   console.log('attend: ', attends);
    //   // '2023-08-01T00:00:00.000Z'

    //   // if (attend.length === 0)
    // } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
