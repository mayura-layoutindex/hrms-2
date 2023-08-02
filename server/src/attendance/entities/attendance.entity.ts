import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  attendance_id: string;

  @Column({ type: 'varchar', length: 100 })
  employee_id: string;

  @Column({ type: 'varchar', length: 100 })
  date: string;

  @Column({ type: 'timestamp' })
  clock_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  clock_out: Date;

  @Column({ type: 'interval', nullable: true })
  total_work_time: string;
}
