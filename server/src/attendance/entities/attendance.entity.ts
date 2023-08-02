import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  attendance_id: string;

  @Column({ type: 'varchar', length: 100 })
  employee_id: string;

  @Column({ type: 'varchar', length: 100 })
  date: string;

  @Column({ type: 'varchar', length: 100 })
  clock_in: string;

  @Column({ type: 'varchar', length: 100 })
  clock_out: string;

  @Column({ type: 'varchar', length: 100 })
  total_work_time: string;
}
