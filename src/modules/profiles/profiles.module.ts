import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../users/users.module';
import { ProfileController } from './profiles.controller';
import { Profiles } from './profiles.entity';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Profiles])],
  providers: [ProfilesService],
  controllers: [ProfileController],
})
export class ProfileModule {}
