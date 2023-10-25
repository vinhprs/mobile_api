import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697888985460 implements MigrationInterface {
  name = 'Migration1697888985460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "grade_id" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "grade_id"`);
  }
}
