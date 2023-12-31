import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceService } from './attendance/attendance.service';
import { AttendanceController } from './attendance/attendance.controller';
import { LeaveModule } from './leave/leave.module';
import { LeaveController } from './leave/leave.controller';
import { LeaveService } from './leave/leave.service';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    AttendanceModule,
    LeaveModule,
  ],
  controllers: [EmployeeController, AttendanceController, LeaveController],
  providers: [EmployeeService, AttendanceService, LeaveService],
})
export class AppModule {}
