import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696924490311 implements MigrationInterface {
  name = 'Migration1696924490311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("_id" SERIAL NOT NULL, "category_name" character varying NOT NULL, "description" text, "list_courses" integer array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "PK_0d6721292a14c4041a79fb021fb" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_cc7f32b7ab33c70b9e715afae84" FOREIGN KEY ("category_id") REFERENCES "category"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_cc7f32b7ab33c70b9e715afae84"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
