import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDateFromEvent1745612316203 implements MigrationInterface {
    name = 'RemoveDateFromEvent1745612316203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "data"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "data" date NOT NULL`);
    }

}
