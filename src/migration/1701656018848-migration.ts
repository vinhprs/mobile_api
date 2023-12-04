import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701656018848 implements MigrationInterface {
  name = 'Migration1701656018848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "is_accept_policy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_disabled" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_deteled" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_deteled"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_disabled"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_accept_policy" boolean NOT NULL DEFAULT false`,
    );
  }
}
