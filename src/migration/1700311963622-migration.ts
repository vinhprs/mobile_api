import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700311963622 implements MigrationInterface {
  name = 'Migration1700311963622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "total" numeric NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
  }
}
