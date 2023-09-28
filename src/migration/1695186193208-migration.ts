import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1695186193208 implements MigrationInterface {
  name = 'migration1695186193208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sampletable1\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NULL, \`tags\` text NOT NULL, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`sampletable1\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
