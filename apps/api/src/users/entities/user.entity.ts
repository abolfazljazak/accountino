import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { UserStatus } from '../enums/status.enum';
import { Roles } from '../enums/role.enum';
import { AbstractEntity } from '@app/common';

@Entity('User')
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ default: Roles.User })
  role: string;

  @Column({ default: UserStatus.Active })
  status: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ default: 0 })
  wallet_balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
