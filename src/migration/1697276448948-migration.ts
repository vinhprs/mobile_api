import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697276448948 implements MigrationInterface {
  name = 'Migration1697276448948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course" ("_id" SERIAL NOT NULL, "course_name" character varying(255) NOT NULL, "description" text, "price" integer NOT NULL, "expired_date" date, "category_id" integer, "sub_category_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ab9e0eff3d917f26c04846d8224" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "section" ("_id" SERIAL NOT NULL, "section_name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "course_id" integer, CONSTRAINT "PK_34df428eb130777a61fcf7dc92b" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lecture_lecture_type_enum" AS ENUM('VIDEO', 'EXAM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lecture" ("_id" SERIAL NOT NULL, "lecture_name" character varying(255) NOT NULL, "lecture_type" "public"."lecture_lecture_type_enum" NOT NULL, "amount" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "section_id" integer, CONSTRAINT "PK_8389063f0374b5ccdf2b4dc7250" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ALTER COLUMN "subject_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "section" ADD CONSTRAINT "FK_7e12912705e3430a0bd74dad81f" FOREIGN KEY ("course_id") REFERENCES "course"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_05b264a75ceaafc30411e2e986e" FOREIGN KEY ("section_id") REFERENCES "section"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_05b264a75ceaafc30411e2e986e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "section" DROP CONSTRAINT "FK_7e12912705e3430a0bd74dad81f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ALTER COLUMN "subject_name" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "lecture"`);
    await queryRunner.query(`DROP TYPE "public"."lecture_lecture_type_enum"`);
    await queryRunner.query(`DROP TABLE "section"`);
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
