import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699108449173 implements MigrationInterface {
    name = 'Migration1699108449173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "teacher_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "teacher_id" integer NOT NULL`);
    }

}
