import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../users/users.entity';
import { Departments } from '../departments/departments.entity';
import { Positions } from '../positions/positions.entity';

@Entity({ name: 'profiles' })
export class Profiles extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User profile', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Profile phone', example: '+8888888888' })
  @Column({ default: null })
  phone: string;

  @ApiProperty({ description: 'Profile Slack Id', example: '1' })
  @Column({ default: null })
  slackId: string;

  @ApiProperty({ description: 'Position', type: Positions })
  @ManyToOne(() => Positions, {
    eager: true,
  })
  position: Positions;

  @ApiProperty({ description: 'Department', type: Departments })
  @ManyToOne(() => Departments, {
    eager: true,
  })
  department: Departments;

  @ApiProperty({
    description: 'When user was born',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  @Column({ default: null })
  birthDate: Date;

  @ApiProperty({
    description: 'When user was hired',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  @Column({ default: null })
  hiredDate: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @ApiProperty({ description: 'When profile was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When profile was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
