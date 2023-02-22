import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/modules/users/users.entity';
import { UserRoles } from 'src/modules/users/enums/users.enum';
import { adminSeed, superAdminSeed, userSeed } from '../user.seed';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countSuperAdmin = await this.repository.count({
      where: {
        role: UserRoles.SUPERADMIN,
      },
    });

    if (countSuperAdmin === 0) {
      await this.repository.save(this.repository.create(superAdminSeed));
    }

    const countAdmin = await this.repository.count({
      where: {
        role: UserRoles.ADMIN,
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(this.repository.create(adminSeed));
    }

    const countUser = await this.repository.count({
      where: {
        role: UserRoles.USER,
      },
    });

    if (countUser === 0) {
      await this.repository.save(this.repository.create(userSeed));
    }
  }
}
