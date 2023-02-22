import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Departments } from './departments.entity';
import { CreateDepartmentDto } from './dto/create.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Departments)
    private departmentRepository: Repository<Departments>,
  ) {}

  async getAll(): Promise<Departments[]> {
    return await this.departmentRepository.find();
  }

  async create(newStatus: CreateDepartmentDto): Promise<Departments> {
    try {
      const { name } = newStatus;
      const status = this.departmentRepository.create();
      status.name = name;
      const created = await this.departmentRepository.save(status);
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
