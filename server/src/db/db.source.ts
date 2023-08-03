import { ConfigService } from '@nestjs/config';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Leave } from 'src/leave/entities/leave.entity';
import { DataSource } from 'typeorm';

export const DbConnection = [
  {
    provide: 'DataSource',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'hrms',
        synchronize: true,
        entities: [Employee, Attendance, Leave],
        logging: true,
      });

      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
