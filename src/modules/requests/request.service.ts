import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getAll(): Promise<Requests[]> {
    return await this.requestsRepository.find();
  }

  async create(user: User, newRequest: CreateRequestDto): Promise<Requests> {
    try {
      const request = this.requestsRepository.create();
      request.user = user;
      const newReq = await this.requestsRepository.save({
        ...request,
        ...newRequest,
      });
      delete newReq.user;
      return newReq;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
