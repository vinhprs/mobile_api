import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1698492994247 implements MigrationInterface {
  name = 'Migration1698492994247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" ADD "is_public" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "is_public"`);
  }
}
