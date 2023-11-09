import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699497290342 implements MigrationInterface {
  name = 'Migration1699497290342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_bookmark" ("_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "course_id" integer, "user_id" uuid, CONSTRAINT "PK_2fd4d4da7dd40e4d1d8ca52ce69" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_bookmark" ADD CONSTRAINT "FK_fafd38e7eaaa2dc5b0ac841d935" FOREIGN KEY ("course_id") REFERENCES "course"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_bookmark" ADD CONSTRAINT "FK_d5619bd83409d0f260d9cd959f3" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_bookmark" DROP CONSTRAINT "FK_d5619bd83409d0f260d9cd959f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_bookmark" DROP CONSTRAINT "FK_fafd38e7eaaa2dc5b0ac841d935"`,
    );
    await queryRunner.query(`DROP TABLE "course_bookmark"`);
  }
}
