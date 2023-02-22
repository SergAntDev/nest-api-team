import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RequestsModule } from './modules/requests/requests.module';
import { ProfileModule } from './modules/profiles/profiles.module';
import { DepartmentModule } from './modules/departments/departments.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    RequestsModule,
    ProfileModule,
    DepartmentModule,
    PositionsModule,
  ],
})
export class AppModule {}
