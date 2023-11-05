import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699194627825 implements MigrationInterface {
  name = 'Migration1699194627825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."question_answer_type_enum" AS ENUM('Chọn nhiều', 'Chọn 1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "answer_type" "public"."question_answer_type_enum" NOT NULL DEFAULT 'Chọn 1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "answer_type"`);
    await queryRunner.query(`DROP TYPE "public"."question_answer_type_enum"`);
  }
}
