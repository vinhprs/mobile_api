import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699108287734 implements MigrationInterface {
    name = 'Migration1699108287734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" ADD "teacher_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "teacher_id"`);
    }

}
