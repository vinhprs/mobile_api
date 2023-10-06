import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696566370642 implements MigrationInterface {
  name = 'Migration1696566370642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject_group" ADD "include_subjects" text array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject_group" DROP COLUMN "include_subjects"`,
    );
  }
}
