import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696574001952 implements MigrationInterface {
  name = 'Migration1696574001952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "ward"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" ADD "ward" integer`);
  }
}
