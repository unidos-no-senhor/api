import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLibrary1620000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'library',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'isbn',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'editora',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'autor',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'anoDeImpressao',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'observacao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'reservado',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('library');
  }
}
