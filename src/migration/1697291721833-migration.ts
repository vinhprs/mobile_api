import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697291721833 implements MigrationInterface {
  name = 'Migration1697291721833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" RENAME COLUMN "amount" TO "duration"`,
    );
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "lecture" ADD "duration" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "duration"`);
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD "duration" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecture" RENAME COLUMN "duration" TO "amount"`,
    );
  }
}
