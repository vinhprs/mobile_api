import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697280970959 implements MigrationInterface {
  name = 'Migration1697280970959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" ADD "teacher_id" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "teacher_id"`);
  }
}
