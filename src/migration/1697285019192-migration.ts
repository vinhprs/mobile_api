import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697285019192 implements MigrationInterface {
  name = 'Migration1697285019192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD "url" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "url"`);
  }
}
