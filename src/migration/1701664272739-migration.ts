import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701664272739 implements MigrationInterface {
  name = 'Migration1701664272739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "memo" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "memo"`);
  }
}
