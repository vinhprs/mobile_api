import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696561979443 implements MigrationInterface {
  name = 'Migration1696561979443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "preferred_subjects" text array`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "subject_group_id" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "subject_group_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "preferred_subjects"`,
    );
  }
}
