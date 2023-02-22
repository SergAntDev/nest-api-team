import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './users.entity';
import { Profiles } from '../profiles/profiles.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profiles])],
  providers: [IsExist, UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
