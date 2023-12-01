import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701394221995 implements MigrationInterface {
  name = 'Migration1701394221995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "course_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_828ec7997a3ace18f305f80948d" FOREIGN KEY ("course_id") REFERENCES "course"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_828ec7997a3ace18f305f80948d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP COLUMN "course_id"`,
    );
  }
}
