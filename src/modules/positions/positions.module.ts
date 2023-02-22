import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsExist } from 'src/utils/validators/is-exists.validator';
import { UserModule } from '../users/users.module';
import { PositionsController } from './positions.controller';
import { Positions } from './positions.entity';
import { PositionsService } from './positions.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Positions])],
  providers: [IsExist, PositionsService],
  controllers: [PositionsController],
})
export class PositionsModule {}
