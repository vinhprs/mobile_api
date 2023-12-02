import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1701418227013 implements MigrationInterface {
  name = 'Migration1701418227013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c86c5b7d5079786fb840989975e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c86c5b7d5079786fb840989975e" FOREIGN KEY ("lecture_id") REFERENCES "lecture"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c86c5b7d5079786fb840989975e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c86c5b7d5079786fb840989975e" FOREIGN KEY ("lecture_id") REFERENCES "lecture"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
