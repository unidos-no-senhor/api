import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1723693825639 implements MigrationInterface {
  name = 'Initial1723693825639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "member" ("observacao" character varying(190), "situacao" character varying(190), "dataSaida" date, "dataEntrada" date, "conjuge" character varying(190), "cep" character varying(190), "cidade" character varying(190), "bairro" character varying(190), "endereco" character varying(190), "cargo" character varying(190), "dataBatismo" date, "dataNascimento" date, "telefone" character varying(190), "email" character varying(190), "nome" character varying(190) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "library" ("isbn" character varying(190), "editora" character varying(190), "autor" character varying(190), "titulo" character varying(190) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "anoDeImpressao" integer, "observacao" character varying(500), "reservado" boolean DEFAULT false, CONSTRAINT "PK_3a61ae2e897d9b5a59a64e91aa4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("data" date NOT NULL, "descricao" character varying NOT NULL, "nome" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "participant_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "membro_id" uuid NOT NULL, CONSTRAINT "PK_b3f0633bceda938d37730ca62be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("responsavel" character varying NOT NULL, "participante" character varying NOT NULL, "evento" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "responsavelId" integer, "eventoId" uuid, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763" FOREIGN KEY ("responsavelId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb" FOREIGN KEY ("eventoId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_143eb65f8d7cff384c414cd98bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_39ad70e3ed4c560f8a33d3e0763"`,
    );
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TABLE "participant_entity"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "library"`);
    await queryRunner.query(`DROP TABLE "member"`);
  }
}
