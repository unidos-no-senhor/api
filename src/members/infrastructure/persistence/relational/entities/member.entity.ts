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
  name: 'member',
})
export class MemberEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  observacao: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  situacao: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dataSaida: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dataEntrada: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  conjuge: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  cep: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  cidade: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  bairro: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  endereco: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  cargo: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dataBatismo: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dataNascimento: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  telefone: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 190 })
  nome: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
