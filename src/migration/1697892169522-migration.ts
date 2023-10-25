import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697892169522 implements MigrationInterface {
  name = 'Migration1697892169522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "preferred_subjects"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "preferred_subjects" integer array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "preferred_subjects"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "preferred_subjects" text array`,
    );
  }
}
