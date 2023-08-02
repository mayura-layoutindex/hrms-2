import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employee_id: string;

  @Column({ type: 'varchar', length: 20 })
  nic: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 10 })
  date_of_birth: string;

  @Column({ type: 'varchar', length: 10 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 5 })
  work_experience: string;

  @Column({ type: 'varchar', length: 10 })
  hired_date: string;

  @Column({ type: 'varchar', length: 20 })
  department: string;

  @Column({ type: 'varchar', length: 20 })
  marital_status: string;
}
