import { ApiProperty } from '@nestjs/swagger';
import { Column, ManyToOne, OneToOne } from 'typeorm';
import { MemberEntity } from '../../members/infrastructure/persistence/relational/entities/member.entity';
import { EventEntity } from '../../events/infrastructure/persistence/relational/entities/event.entity';

export class Attendance {
  @ApiProperty()
  @Column('int4')
  @ManyToOne(() => MemberEntity, (member) => member.id)
  responsavel: string;

  @ApiProperty()
  @Column('uuid')
  @OneToOne(() => MemberEntity, (member) => member.id)
  participante: string;

  @ApiProperty()
  @Column('uuid')
  @ManyToOne(() => EventEntity, (event) => event.id)
  evento: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
