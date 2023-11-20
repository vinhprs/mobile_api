import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700309828186 implements MigrationInterface {
  name = 'Migration1700309828186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" RENAME COLUMN "total_price" TO "price"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" RENAME COLUMN "price" TO "total_price"`,
    );
  }
}
