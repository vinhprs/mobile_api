import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701764156729 implements MigrationInterface {
    name = 'Migration1701764156729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_6fee2da4448fcbcffffa77f702c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_6fee2da4448fcbcffffa77f702c" FOREIGN KEY ("exam_id") REFERENCES "exam"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
