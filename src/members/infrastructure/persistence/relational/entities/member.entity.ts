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
  observacao: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  situacao: string | null;

  @Column({ type: 'date', nullable: true })
  dataSaida: string | null;

  @Column({ type: 'date', nullable: true })
  dataEntrada: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  conjuge: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cep: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cidade: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  bairro: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  endereco: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cargo: string | null;

  @Column({ type: 'date', nullable: true })
  dataBatismo: string | null;

  @Column({ type: 'date', nullable: true })
  dataNascimento: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  telefone: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 190 })
  nome: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
