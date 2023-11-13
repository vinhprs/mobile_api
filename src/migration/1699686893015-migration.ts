import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699686893015 implements MigrationInterface {
  name = 'Migration1699686893015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart" ("_id" SERIAL NOT NULL, "price" integer NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "course_id" integer, CONSTRAINT "PK_ec117221695fb740d8cb2f04868" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_ccbdf937aeec8a8e8fb3c454d60" FOREIGN KEY ("course_id") REFERENCES "course"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_ccbdf937aeec8a8e8fb3c454d60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`,
    );
    await queryRunner.query(`DROP TABLE "cart"`);
  }
}
