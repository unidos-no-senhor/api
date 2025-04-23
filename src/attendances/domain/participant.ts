import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToOne } from 'typeorm';
import { MemberEntity } from '../../members/infrastructure/persistence/relational/entities/member.entity';

export class Participant {
  @ApiProperty()
  @Column('uuid')
  id: string;

  @ApiProperty()
  @Column('varchar')
  nome: string;

  @ApiProperty()
  @Column('uuid')
  @OneToOne(() => MemberEntity, (member) => member.id)
  membro_id: string;
}
