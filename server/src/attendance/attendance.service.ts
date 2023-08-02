import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async create(createAttendanceDto: CreateAttendanceDto) {
    try {
      const attend = await this.manager.findOneBy(Attendance, {
        employee_id: createAttendanceDto.employee_id,
        date: createAttendanceDto.date,
      });

      if (attend) {
        throw new Error('Employee is already started work');
      }

      const createAttendance = await this.manager.create(Attendance, {
        employee_id: createAttendanceDto.employee_id,
        date: createAttendanceDto.date,
        clock_in: createAttendanceDto.clock_in,
        clock_out: '',
        total_work_time: '',
      });

      await this.manager.save(Attendance, createAttendance);

      return { msg: 'Attendance created successfully', createAttendance };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAllAttendance() {
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

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
