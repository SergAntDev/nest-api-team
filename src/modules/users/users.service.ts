import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { CreateUserDto } from './dto/user-create.req.dto';
import { SqlErrorCode } from 'db/enum/errorCodes.enum';
import { User } from './users.entity';
import { Requests } from '../requests/requests.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create();
    user.first_name = newUser.first_name;
    user.second_name = newUser.second_name;
    user.email = newUser.email;
    user.password = newUser.password;

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === SqlErrorCode.DUPLICATE_ENTRY) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getRequests(user: User): Promise<Requests[]> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { id: user.id },
        relations: { requests: true },
      });
      if (findUser) {
        return findUser.requests;
      }
      return [];
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser(options: FindOneOptions): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  async update(
    id: string,
    data: object,
  ): Promise<User | UpdateResult | undefined> {
    const user = await this.getUser({ where: { id } });
    if (user) {
      return await this.usersRepository.update(id, data);
    }
    return;
  }

  async remove(id: number | string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
