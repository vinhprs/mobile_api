import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701327933047 implements MigrationInterface {
  name = 'Migration1701327933047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("_id" SERIAL NOT NULL, "author_name" character varying NOT NULL, "author_thumbnail" text NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "lecture_id" integer, CONSTRAINT "PK_f069f9101854625792dca32f117" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c86c5b7d5079786fb840989975e" FOREIGN KEY ("lecture_id") REFERENCES "lecture"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c86c5b7d5079786fb840989975e"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
