import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Positions } from 'src/modules/positions/positions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsSeedService {
  constructor(
    @InjectRepository(Positions)
    private repository: Repository<Positions>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save([
        this.repository.create({
          name: 'Developer',
        }),
        this.repository.create({
          name: 'Manager',
        }),
        this.repository.create({
          name: 'Designer',
        }),
      ]);
    }
  }
}
