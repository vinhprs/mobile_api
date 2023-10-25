import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697425773650 implements MigrationInterface {
  name = 'Migration1697425773650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" ADD "thumbnail_url" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "thumbnail_url"`);
  }
}
