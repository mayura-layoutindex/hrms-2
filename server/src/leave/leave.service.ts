import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Leave } from './entities/leave.entity';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

@Injectable()
export class LeaveService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async createLeave(createLeaveDto: CreateLeaveDto) {
    try {
      const startDate = dayjs(createLeaveDto.start_date);
      const endDate = dayjs(createLeaveDto.end_date);

      const noOfDays = endDate.diff(startDate, 'day');

      const createLeave = await this.manager.create(Leave, {
        employee_id: createLeaveDto.employee_id,
        leave_type: createLeaveDto.leave_type,
        applied_date: new Date(),
        start_date: new Date(createLeaveDto.start_date),
        end_date: new Date(createLeaveDto.end_date),
        no_of_days: noOfDays,
        approved_by: '',
        description: createLeaveDto.description,
        status: 'pending',
      });

      await this.manager.save(Leave, createLeave);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async getAllLeaves() {
    try {
      const leaves = await this.manager.find(Leave);

      if (leaves.length === 0) {
        throw new Error('Data is not found');
      }

      return { msg: 'Get data successfully', data: leaves };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async getLeavesByEmployeeId(employee_id: string) {
    try {
      const leaves = await this.manager.find(Leave, { where: { employee_id } });

      return { employeeId: employee_id, leaves };
    } catch (error) {}
  }

  async updateLeave(leave_id: string, updateLeaveDto: UpdateLeaveDto) {
    try {
      const leave = await this.manager.findOne(Leave, { where: { leave_id } });

      if (!leave) {
        throw new Error('Leave not found');
      }

      leave.applied_date = updateLeaveDto.applied_date;
      leave.description = updateLeaveDto.description;
      leave.leave_type = updateLeaveDto.leave_type;
      leave.start_date = updateLeaveDto.start_date;
      leave.end_date = updateLeaveDto.end_date;
      leave.no_of_days = updateLeaveDto.no_of_days;
      leave.status = updateLeaveDto.status;

      return { msg: 'Leave updated succesfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeLeave(leave_id: string) {
    try {
      const leave = await this.manager.findOneBy(Leave, { leave_id });

      if (!leave) {
        throw new Error('Leave is not found');
      }

      await this.manager.delete(Leave, leave_id);

      return 'Detele leave successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
