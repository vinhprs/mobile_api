import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709373613425 implements MigrationInterface {
    name = 'Migration1709373613425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("_id" SERIAL NOT NULL, "message" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "chat_id" integer, "sender_id" uuid, CONSTRAINT "PK_89218ae505e42c9427af38727ca" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("_id" SERIAL NOT NULL, "members" integer array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "course_id" integer, CONSTRAINT "PK_8b0f6049a5951f15eddaecfc222" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_17df3de0fe1328d76512271d1d2" FOREIGN KEY ("course_id") REFERENCES "course"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_17df3de0fe1328d76512271d1d2"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
