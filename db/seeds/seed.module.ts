import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from 'db/data-source';
import { DepartmentsSeedModule } from './departments/departments-seed.module';
import { PositionsSeedModule } from './positions/positions-seed.module';
import { UsersSeedModule } from './users/users-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    DepartmentsSeedModule,
    PositionsSeedModule,
    UsersSeedModule,
  ],
})
export class SeedModule {}
