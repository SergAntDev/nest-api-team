import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

import { UserRoles } from './enums/users.enum';
import { Requests } from '../requests/requests.entity';
import { Profiles } from '../profiles/profiles.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User first name', example: 'admin' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'User second name', example: 'Admin' })
  @Column()
  secondName: string;

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
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
    comment: '1 - superadmin, 2 - admin, 3 - user',
  })
  role: UserRoles;

  @OneToMany(() => Requests, (requests) => requests.user)
  @JoinColumn()
  requests: Requests[];

  @OneToOne(() => Profiles, {
    eager: true,
  })
  @JoinColumn()
  profile?: Profiles | null;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = bcrypt.hashSync(password || this.password, 10);
  }
}
