import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699321712459 implements MigrationInterface {
  name = 'Migration1699321712459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_exam" ("_id" SERIAL NOT NULL, "complete_time" numeric(10,2) NOT NULL, "corrects" integer NOT NULL DEFAULT '0', "total_questions" integer NOT NULL DEFAULT '0', "score" numeric NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "exam_id" integer, CONSTRAINT "PK_7bbe53bc7e3059be70657ae5186" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exam" ADD CONSTRAINT "FK_6bc59a5f8844254c8a6f95c121d" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exam" ADD CONSTRAINT "FK_611c88152e7946bbff4581be895" FOREIGN KEY ("exam_id") REFERENCES "exam"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_exam" DROP CONSTRAINT "FK_611c88152e7946bbff4581be895"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exam" DROP CONSTRAINT "FK_6bc59a5f8844254c8a6f95c121d"`,
    );
    await queryRunner.query(`DROP TABLE "user_exam"`);
  }
}
