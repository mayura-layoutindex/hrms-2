import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PunchInDto } from './dto/punch-in.dto';
import { PunchOutDto } from './dto/punch-out.dto';
import { DataSource, EntityManager, Between, Not, IsNull } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import { PostgresInterval } from 'pg';

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

  async punchOut(attendance_id: string) {
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

  async getAllAttendances() {
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
    try {
      const attends = await this.manager.find(Attendance, {
        where: {
          employee_id,
          clock_in: Between(new Date(start_date), new Date(end_date)),
          clock_out: Not(IsNull()),
        },
      });

      let totalDuration = dayjs.duration(0);

      attends.forEach((attendance) => {
        const {
          hours = 0,
          minutes = 0,
          seconds = 0,
          milliseconds = 0,
        } = attendance.total_work_time as PostgresInterval;
        const duration = dayjs.duration({
          hours,
          minutes,
          seconds,
          milliseconds,
        });
        totalDuration = totalDuration.add(duration);
      });

      const totalDurationObject = {
        years: totalDuration.years(),
        months: totalDuration.months(),
        days: totalDuration.days(),
        hours: totalDuration.hours(),
        minutes: totalDuration.minutes(),
        seconds: totalDuration.seconds(),
        milliseconds: totalDuration.milliseconds(),
      };

      return { totalDuration: totalDurationObject };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
