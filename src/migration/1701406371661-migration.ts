import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701406371661 implements MigrationInterface {
  name = 'Migration1701406371661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "author_thumbnail" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "author_thumbnail" SET NOT NULL`,
    );
  }
}
