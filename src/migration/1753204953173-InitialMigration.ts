import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753204953173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create person table
        await queryRunner.query(`
            CREATE TABLE "person" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_5fdaf670315c4b7d70cce85daa3" PRIMARY KEY ("id")
            )
        `);

        // Create post table
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "personId" integer,
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
            )
        `);

        // Create follower table
        await queryRunner.query(`
            CREATE TABLE "follower" (
                "id" SERIAL NOT NULL,
                "personId" integer,
                "followerId" integer,
                CONSTRAINT "PK_5f86338b16e4f1c96c6c4e8b8b8" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "post" 
            ADD CONSTRAINT "FK_post_person" 
            FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "follower" 
            ADD CONSTRAINT "FK_follower_person" 
            FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "follower" 
            ADD CONSTRAINT "FK_follower_follower" 
            FOREIGN KEY ("followerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_follower_follower"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_follower_person"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_post_person"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "follower"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }
}
