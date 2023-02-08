import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

import { UserRoles } from './enums/users.enum';
import { Requests } from '../requests/requests.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User first name', example: 'admin' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'User second name', example: 'Admin' })
  @Column()
  second_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'admin@admin.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'User role' })
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.EMPLOYEE })
  role: UserRoles;

  @OneToMany(() => Requests, (requests) => requests.user)
  @JoinColumn()
  requests: Requests[];

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password || this.password, 10);
  }
}