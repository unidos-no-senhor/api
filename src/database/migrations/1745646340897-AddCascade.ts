import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascade1745646340897 implements MigrationInterface {
    name = 'AddCascade1745646340897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb" FOREIGN KEY ("eventoId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee" FOREIGN KEY ("evento") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb"`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee" FOREIGN KEY ("evento") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb" FOREIGN KEY ("eventoId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
