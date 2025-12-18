import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedUser1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin123', 10);

    await queryRunner.query(`
      INSERT INTO "user" (email, password)
      VALUES ('admin@terralink.com', '${password}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user"
      WHERE email = 'admin@terralink.com'
    `);
  }
}
