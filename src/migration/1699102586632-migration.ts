import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699102586632 implements MigrationInterface {
  name = 'Migration1699102586632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."question_question_level_enum" AS ENUM('Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao')`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "question_level" "public"."question_question_level_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "question_level"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."question_question_level_enum"`,
    );
  }
}
