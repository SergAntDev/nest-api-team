import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';

import { UserModule } from '../users/users.module';
import { ProfileController } from './profiles.controller';
import { Profiles } from './profiles.entity';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Profiles])],
  providers: [IsExist, ProfilesService],
  controllers: [ProfileController],
})
export class ProfileModule {}
