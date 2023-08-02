import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { DataSource, EntityManager } from 'typeorm';
import { Leave } from './entities/leave.entity';

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
      const createLeave = await this.manager.create(Leave, {
        employee_id: createLeaveDto.employee_id,
        leave_type: createLeaveDto.leave_type,
        applied_date: new Date(),
        start_date: new Date(),
        end_date: new Date(),
        no_of_days: createLeaveDto.no_of_days,
        approved_by: createLeaveDto.approved_by,
        description: createLeaveDto.description,
      });

      await this.manager.save(Leave, createLeave);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  findAll() {
    return `This action returns all leave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leave`;
  }

  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return `This action updates a #${id} leave`;
  }

  remove(id: number) {
    return `This action removes a #${id} leave`;
  }
}
