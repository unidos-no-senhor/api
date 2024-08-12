import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'library',
})
export class LibraryEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  isbn: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  editora: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  autor: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190 })
  titulo: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  anoDeImpressao: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao: string;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: true, default: false })
  reservado: boolean;
}
