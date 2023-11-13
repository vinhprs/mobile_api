import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699891187563 implements MigrationInterface {
    name = 'Migration1699891187563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "total_duration" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "total_duration"`);
    }

}
