import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1709477941355 implements MigrationInterface {
  name = 'Migration1709477941355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "members"`);
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "members" character varying array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "members"`);
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "members" integer array NOT NULL`,
    );
  }
}
