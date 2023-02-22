import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Entity()
export class Departments extends BaseEntity {
  @ApiProperty({ description: 'Primary key of Department', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Department name', example: 'Name' })
  @Allow()
  @Column()
  name: string;

  @ApiProperty({ description: 'When Department was created' })
  @Allow()
  @CreateDateColumn()
  createdAt: Date;
}
