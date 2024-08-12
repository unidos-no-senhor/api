import { MigrationInterface, QueryRunner } from 'typeorm';

export class Attendance1723441559390 implements MigrationInterface {
  name = 'Attendance1723441559390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attendance" ("responsavel_id" character varying NOT NULL, "participante_id" character varying NOT NULL, "evento_id" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("observacao" character varying(190), "situacao" character varying(190), "dataSaida" date, "dataEntrada" date, "conjuge" character varying(190), "cep" character varying(190), "cidade" character varying(190), "bairro" character varying(190), "endereco" character varying(190), "cargo" character varying(190), "dataBatismo" date, "dataNascimento" date, "telefone" character varying(190), "email" character varying(190), "nome" character varying(190) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "isbn"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "isbn" character varying(190)`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "editora" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "editora" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "isbn"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "isbn" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TABLE "attendance"`);
  }
}
