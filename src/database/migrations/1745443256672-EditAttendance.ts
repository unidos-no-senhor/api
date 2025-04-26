import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditAttendance1745443256672 implements MigrationInterface {
  name = 'EditAttendance1745443256672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "event_participants" (
              "id" UUID NOT NULL UNIQUE,
              "participant_id" UUID NOT NULL,
              "event_id" UUID NOT NULL,
              CONSTRAINT "PK_event_participants" PRIMARY KEY ("id"),
              CONSTRAINT "FK_event_participants_participant" FOREIGN KEY ("participant_id") 
                REFERENCES "participant_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT "FK_event_participants_event" FOREIGN KEY ("event_id") 
                REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
          `);
    await queryRunner.query(`
            ALTER TABLE "event_participants" RENAME COLUMN "participant_id" TO "participante";
            ALTER TABLE "event_participants" RENAME COLUMN "event_id" TO "evento";
          `);
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "date" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "createdAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "responsavelId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "responsavelId" uuid`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" ADD CONSTRAINT "FK_d1d5ab273496866df9366b1b627" FOREIGN KEY ("participante") REFERENCES "participant_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" ADD CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee" FOREIGN KEY ("evento") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763" FOREIGN KEY ("responsavelId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" DROP CONSTRAINT "FK_0cb79b3cc12877bec84c990d5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" DROP CONSTRAINT "FK_d1d5ab273496866df9366b1b627"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "responsavelId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "responsavelId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" DROP CONSTRAINT "PK_b65ffd558d76fd51baffe81d42b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "createdAt" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "userId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763" FOREIGN KEY ("responsavelId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "event_participants" ADD CONSTRAINT "FK_event_participants_event" FOREIGN KEY ("evento") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_participants" ADD CONSTRAINT "FK_event_participants_participant" FOREIGN KEY ("participante") REFERENCES "participant_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
