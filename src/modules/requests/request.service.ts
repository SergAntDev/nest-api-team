import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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

  async getMy(user: User): Promise<Requests[]> {
    try {
      const findUserRequests = await this.requestsRepository.find({
        where: { id: user.id },
      });
      if (findUserRequests) {
        return findUserRequests;
      }
      return [];
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getForUser(options: FindManyOptions): Promise<Requests[]> {
    try {
      const findUserRequests = await this.requestsRepository.find(options);
      if (findUserRequests) {
        return findUserRequests;
      }
      return [];
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(user: User, newRequest: CreateRequestDto): Promise<Requests> {
    const { reason, comment, date } = newRequest;

    try {
      const request = this.requestsRepository.create();
      request.user = user;
      const newReq = await this.requestsRepository.save({
        ...request,
        reason,
        comment,
        date,
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
