import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'requests' })
export class Requests extends BaseEntity {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Request reason', example: 'reason' })
  @Column()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: 'Request comment', example: 'comment' })
  @Column({ length: 1000 })
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ description: 'Date', type: String, format: 'date-time' })
  @Column()
  @IsNotEmpty()
  date: Date;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ApiProperty({ description: 'When request was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
