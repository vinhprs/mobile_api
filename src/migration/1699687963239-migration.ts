import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699687963239 implements MigrationInterface {
    name = 'Migration1699687963239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "discount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "discount" DROP DEFAULT`);
    }

}
