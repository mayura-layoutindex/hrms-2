import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leave')
export class Leave {
  @PrimaryGeneratedColumn('uuid')
  leave_id: string;

  @Column({ type: 'varchar' })
  employee_id: string;

  @Column({ type: 'varchar', length: 50 })
  leave_type: string;

  @Column({ type: 'timestamp' })
  applied_date: Date;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'int' })
  no_of_days: number;

  @Column({ type: 'string', length: 100 })
  approved_by: string;

  @Column({ type: 'string', length: 200 })
  description: string;
}
