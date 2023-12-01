import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701415700809 implements MigrationInterface {
    name = 'Migration1701415700809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "like_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "like_count"`);
    }

}
