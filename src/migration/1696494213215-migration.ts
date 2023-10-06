import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1696494213215 implements MigrationInterface {
  name = 'Migration1696494213215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("_id" SERIAL NOT NULL, "province" integer, "district" integer, "ward" integer, "detail" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eadc386b023af2ddcf2e1bd94ec" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subject_group" ("_id" SERIAL NOT NULL, "subject_group_name" character varying(255), "include_subjects" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_91930f71348b4fb65ddae12c11e" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subject" ("_id" SERIAL NOT NULL, "subject_name" character varying(255), "include_courses" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ca5d4ef9f9901d3f03f0d0ae20" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "address_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_302d96673413455481d5ff4022a" UNIQUE ("address_id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "gender" boolean`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "gender" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_302d96673413455481d5ff4022a"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
    await queryRunner.query(`DROP TABLE "subject"`);
    await queryRunner.query(`DROP TABLE "subject_group"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
