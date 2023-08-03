import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async addAnEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.addAnEmployee(createEmployeeDto);
  }

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') employee_id: string) {
    return this.employeeService.getEmployeeById(employee_id);
  }

  @Patch(':id')
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
