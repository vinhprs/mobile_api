import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1703176961852 implements MigrationInterface {
  name = 'Migration1703176961852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "UQ_dff3c45c6a2688bdef948f158a7" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecture" ALTER COLUMN "url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" ALTER COLUMN "url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "UQ_dff3c45c6a2688bdef948f158a7"`,
    );
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "slug"`);
  }
}
