import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699101768265 implements MigrationInterface {
  name = 'Migration1699101768265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("_id" SERIAL NOT NULL, "question_title" character varying NOT NULL, "answers" character varying array NOT NULL, "correct_answers" integer array NOT NULL, "answer_explain" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "exam_id" integer, CONSTRAINT "PK_7172ea1d3c8db07e93733f22e92" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exam" ("_id" SERIAL NOT NULL, "exam_title" character varying(255) NOT NULL, "category_id" integer NOT NULL, "sub_category_id" integer NOT NULL, "time" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_676e1d55807c98f96489136c0e6" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_7320b43dd91d88b143705930c0a" FOREIGN KEY ("exam_id") REFERENCES "exam"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_7320b43dd91d88b143705930c0a"`,
    );
    await queryRunner.query(`DROP TABLE "exam"`);
    await queryRunner.query(`DROP TABLE "question"`);
  }
}
