import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { DepartmnetSeedService } from './departments/departments-seed.service';
import { PositionsSeedService } from './positions/positions-seed.service';
import { UserSeedService } from './users/users-seed.service';

const runSeed = async () => {
  try {
    const app = await NestFactory.create(SeedModule);

    await app.get(DepartmnetSeedService).run();
    await app.get(PositionsSeedService).run();
    await app.get(UserSeedService).run();

    await app.close();
  } catch (error) {
    console.error(`Failed to create seed, due to ${error}`);
    process.exit(1);
  }
};

void runSeed();
