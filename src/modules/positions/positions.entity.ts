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
export class Positions extends BaseEntity {
  @ApiProperty({ description: 'Primary key of Position', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Position name', example: 'Name' })
  @Allow()
  @Column()
  name: string;

  @ApiProperty({ description: 'When Position was created' })
  @Allow()
  @CreateDateColumn()
  createdAt: Date;
}
