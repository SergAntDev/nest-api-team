import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Positions } from 'src/modules/positions/positions.entity';
import { PositionsSeedService } from './positions-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Positions])],
  providers: [PositionsSeedService],
  exports: [PositionsSeedService],
})
export class PositionsSeedModule {}
