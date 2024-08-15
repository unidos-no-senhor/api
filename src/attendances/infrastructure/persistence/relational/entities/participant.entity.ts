import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from '../../../../../members/infrastructure/persistence/relational/entities/member.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity()
export class ParticipantEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column('uuid')
  @OneToOne(() => MemberEntity, (member) => member.id, { nullable: true })
  membro_id: string;
}
