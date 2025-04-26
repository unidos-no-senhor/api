import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodeToAttendance1745444896445 implements MigrationInterface {
    name = 'AddCodeToAttendance1745444896445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "code"`);
    }

}
