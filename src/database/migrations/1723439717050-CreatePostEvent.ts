import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostEvent1723439717050 implements MigrationInterface {
  name = 'CreatePostEvent1723439717050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("data" date NOT NULL, "descricao" character varying NOT NULL, "nome" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "isbn" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "editora"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "editora" character varying(190) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "autor"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "autor" character varying(190)`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "titulo"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "titulo" character varying(190) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "observacao"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "observacao" character varying(500)`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "reservado" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "reservado" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "observacao"`);
    await queryRunner.query(`ALTER TABLE "library" ADD "observacao" text`);
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "titulo"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "titulo" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "autor"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "autor" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "library" DROP COLUMN "editora"`);
    await queryRunner.query(
      `ALTER TABLE "library" ADD "editora" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "library" ALTER COLUMN "isbn" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
