import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return this.employeeService.findAllEmployees();
  }

  @Get(':id')
  async findOne(@Param('id') employee_id: string) {
    return this.employeeService.findEmployeeById(employee_id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') employee_id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(employee_id, updateEmployeeDto);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') employee_id: string) {
    return this.employeeService.deleteEmployee(employee_id);
  }
}
