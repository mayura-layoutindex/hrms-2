import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  createLeave(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.createLeave(createLeaveDto);
  }

  @Get()
  getAllLeaves() {
    return this.leaveService.getAllLeaves();
  }

  @Get(':id')
  findLeavesByEmployee(@Param('id') id: string) {
    return this.leaveService.getLeavesByEmployeeId(id);
  }

  @Patch(':id')
  updateLeave(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.updateLeave(id, updateLeaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveService.removeLeave(id);
  }
}
