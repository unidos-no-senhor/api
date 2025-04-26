import { ApiProperty } from '@nestjs/swagger';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipantEntity } from '../infrastructure/persistence/relational/entities/participant.entity';
import { EventEntity } from '../../events/infrastructure/persistence/relational/entities/event.entity';

export class EventParticipant {
  @ApiProperty()
  @Column('uuid')
  id: string;

  @ApiProperty()
  @Column('uuid')
  @ManyToOne(() => ParticipantEntity, (participant) => participant.id)
  participante: string;

  @ApiProperty()
  @Column('uuid')
  @ManyToOne(() => EventEntity, (event) => event.id)
  evento: string;
}
