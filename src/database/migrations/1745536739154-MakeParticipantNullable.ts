import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeParticipantNullable1745536739154 implements MigrationInterface {
    name = 'MakeParticipantNullable1745536739154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" ALTER COLUMN "participante" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" ALTER COLUMN "participante" SET NOT NULL`);
    }

}
