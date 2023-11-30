import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701308726772 implements MigrationInterface {
  name = 'Migration1701308726772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_78ae5dbb93417c8678f50b3e01a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_78ae5dbb93417c8678f50b3e01a" FOREIGN KEY ("cart_id") REFERENCES "cart"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_78ae5dbb93417c8678f50b3e01a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_78ae5dbb93417c8678f50b3e01a" FOREIGN KEY ("cart_id") REFERENCES "cart"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
