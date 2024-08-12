import { ApiProperty } from '@nestjs/swagger';
import { Column, Generated, OneToOne } from 'typeorm';
import { MemberEntity } from '../../members/infrastructure/persistence/relational/entities/member.entity';

export class Attendance {
  @ApiProperty()
  @Generated('uuid')
  @Column()
  @OneToOne(() => MemberEntity, (member) => member.id)
  responsavel_id: string;

  @ApiProperty()
  @Column('uuid')
  @OneToOne(() => MemberEntity, (member) => member.id)
  participante_id: string;

  @ApiProperty()
  evento_id: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
