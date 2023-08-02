import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.manager.findOneBy(Employee, {
        nic: createEmployeeDto.nic,
      });

      if (employee) {
        throw new Error('Employee is already exists!');
      }

      const createEmployee = await this.manager.create(Employee, {
        nic: createEmployeeDto.nic,
        first_name: createEmployeeDto.first_name,
        last_name: createEmployeeDto.last_name,
        gender: createEmployeeDto.gender,
        date_of_birth: createEmployeeDto.date_of_birth,
        phone_number: createEmployeeDto.phone_number,
        address: createEmployeeDto.address,
        work_experience: createEmployeeDto.work_experience,
        hired_date: createEmployeeDto.hired_date,
        department: createEmployeeDto.department,
        marital_status: createEmployeeDto.marital_status,
      });

      await this.manager.save(Employee, createEmployee);

      return { msg: 'Employee created successfully', createEmployee };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findAllEmployees() {
    try {
      const employees = await this.manager.find(Employee);

      if (employees.length === 0) {
        throw new Error('Data is not found');
      }

      return { msg: 'Get Data Successfully', data: employees };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async findEmployeeById(employee_id: string) {
    try {
      const employee = await this.manager.findOneBy(Employee, { employee_id });

      if (!employee) {
        throw new Error('Data is not found');
      }

      return { msg: 'Get Data Successfully', data: employee };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async updateEmployee(
    employee_id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const employee = await this.manager.findOneBy(Employee, { employee_id });

      if (!employee) {
        throw new Error('Employee is not found');
      }

      (employee.nic = updateEmployeeDto.nic),
        (employee.first_name = updateEmployeeDto.first_name),
        (employee.last_name = updateEmployeeDto.last_name),
        (employee.gender = updateEmployeeDto.gender),
        (employee.date_of_birth = updateEmployeeDto.date_of_birth),
        (employee.phone_number = updateEmployeeDto.phone_number),
        (employee.address = updateEmployeeDto.address),
        (employee.work_experience = updateEmployeeDto.work_experience),
        (employee.hired_date = updateEmployeeDto.hired_date),
        (employee.department = updateEmployeeDto.department),
        (employee.marital_status = updateEmployeeDto.marital_status);

      await this.manager.update(Employee, employee_id, employee);

      return { msg: 'User update successfully', employee };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async deleteEmployee(employee_id: string) {
    try {
      const user = await this.manager.findOneBy(Employee, { employee_id });

      if (!user) {
        throw new Error('Employee is not found');
      }

      await this.manager.delete(Employee, employee_id);

      return 'Delete employee successfully';
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
