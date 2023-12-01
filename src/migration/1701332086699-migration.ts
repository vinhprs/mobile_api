import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701332086699 implements MigrationInterface {
    name = 'Migration1701332086699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_f069f9101854625792dca32f117"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "_id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_f069f9101854625792dca32f117" PRIMARY KEY ("_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_f069f9101854625792dca32f117"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "_id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_f069f9101854625792dca32f117" PRIMARY KEY ("_id")`);
    }

}
