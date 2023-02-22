import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePositionDto } from './dto/create.dto';
import { Positions } from './positions.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Positions)
    private positionsRepository: Repository<Positions>,
  ) {}

  async getAll(): Promise<Positions[]> {
    return await this.positionsRepository.find();
  }

  async create(newPosition: CreatePositionDto): Promise<Positions> {
    try {
      const { name } = newPosition;
      const position = this.positionsRepository.create();
      position.name = name;
      const created = await this.positionsRepository.save(position);
      return created;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          errors: { exeption: 'Something went wrong' },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
