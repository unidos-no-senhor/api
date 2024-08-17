import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'member',
})
export class MemberEntity extends EntityRelationalHelper {
  @Column({ type: 'varchar', length: 190, nullable: true })
  observacao: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  situacao: string;

  @Column({ type: 'date', nullable: true })
  dataSaida: string;

  @Column({ type: 'date', nullable: true })
  dataEntrada: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  conjuge: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cargo: string;

  @Column({ type: 'date', nullable: true })
  dataBatismo: string;

  @Column({ type: 'date', nullable: true })
  dataNascimento: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 190 })
  nome: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
