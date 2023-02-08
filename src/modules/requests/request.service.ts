import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { CreateRequestDto } from './dto/create.dto';
import { Requests } from './requests.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
  ) {}

  async create(user: User, newRequest: CreateRequestDto): Promise<Requests> {
    const request = this.requestsRepository.create();
    request.user = user;
    return await this.requestsRepository.save({ ...request, ...newRequest });
  }
}
