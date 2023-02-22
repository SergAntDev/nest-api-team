import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Departments } from 'src/modules/departments/departments.entity';
import { DepartmnetSeedService } from './departments-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departments])],
  providers: [DepartmnetSeedService],
  exports: [DepartmnetSeedService],
})
export class DepartmentsSeedModule {}
