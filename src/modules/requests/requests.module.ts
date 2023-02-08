import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/users.entity';
import { UserModule } from '../users/users.module';
import { RequestsService } from './request.service';
import { RequestsController } from './requests.controller';
import { Requests } from './requests.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Requests, User])],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
