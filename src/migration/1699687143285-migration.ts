import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699687143285 implements MigrationInterface {
  name = 'Migration1699687143285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "price" TO "discount"`,
    );
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "discount"`);
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "discount" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "discount"`);
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "discount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "discount" TO "price"`,
    );
  }
}
