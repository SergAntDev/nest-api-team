import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Departments } from './departments.entity';
import { DepartmentController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { UserModule } from '../users/users.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Departments])],
  providers: [IsExist, DepartmentsService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
