import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1695888916699 implements MigrationInterface {
  name = 'migration1695888916699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "fullname" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "fullname" SET NOT NULL`,
    );
  }
}
