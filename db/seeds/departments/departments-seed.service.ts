import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Departments } from 'src/modules/departments/departments.entity';

@Injectable()
export class DepartmnetSeedService {
  constructor(
    @InjectRepository(Departments)
    private repository: Repository<Departments>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          name: 'Developers',
        }),
        this.repository.create({
          name: 'Managers',
        }),
      ]);
    }
  }
}
