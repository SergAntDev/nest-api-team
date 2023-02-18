import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './users.entity';
import { Profiles } from '../profiles/profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profiles])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
