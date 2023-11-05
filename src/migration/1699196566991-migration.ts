import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699196566991 implements MigrationInterface {
  name = 'Migration1699196566991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_7320b43dd91d88b143705930c0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_7320b43dd91d88b143705930c0a" FOREIGN KEY ("exam_id") REFERENCES "exam"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_7320b43dd91d88b143705930c0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_7320b43dd91d88b143705930c0a" FOREIGN KEY ("exam_id") REFERENCES "exam"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
