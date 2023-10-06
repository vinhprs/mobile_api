import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696565952229 implements MigrationInterface {
  name = 'Migration1696565952229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subject_group_subjects_subject" ("subjectGroup_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_6f66ee429ac8c387096af769706" PRIMARY KEY ("subjectGroup_id", "subject_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a55c4a7ca257ac4c714b9c54b1" ON "subject_group_subjects_subject" ("subjectGroup_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2e2a9983f769d4cf31298aff0" ON "subject_group_subjects_subject" ("subject_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_group" DROP COLUMN "include_subjects"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_group_subjects_subject" ADD CONSTRAINT "FK_a55c4a7ca257ac4c714b9c54b1f" FOREIGN KEY ("subjectGroup_id") REFERENCES "subject_group"("_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_group_subjects_subject" ADD CONSTRAINT "FK_f2e2a9983f769d4cf31298aff0d" FOREIGN KEY ("subject_id") REFERENCES "subject"("_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subject_group_subjects_subject" DROP CONSTRAINT "FK_f2e2a9983f769d4cf31298aff0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_group_subjects_subject" DROP CONSTRAINT "FK_a55c4a7ca257ac4c714b9c54b1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject_group" ADD "include_subjects" text array`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2e2a9983f769d4cf31298aff0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a55c4a7ca257ac4c714b9c54b1"`,
    );
    await queryRunner.query(`DROP TABLE "subject_group_subjects_subject"`);
  }
}
