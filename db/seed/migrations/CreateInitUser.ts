import { MigrationInterface, QueryRunner } from 'typeorm';

import { userSeed } from '../user.seed';

export class SeedUser1556357483083 implements MigrationInterface {
  name = 'SeedUser1556357483083';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO users (firstName, secondName, email, password, role) VALUES(?,?,?,?,?)`,
      [
        userSeed.firstName,
        userSeed.secondName,
        userSeed.email,
        userSeed.password,
        userSeed.role,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // do nothing
  }
}
