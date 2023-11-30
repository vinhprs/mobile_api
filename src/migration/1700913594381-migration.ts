import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700913594381 implements MigrationInterface {
  name = 'Migration1700913594381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
