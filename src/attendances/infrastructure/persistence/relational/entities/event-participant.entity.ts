import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParticipantEntity } from './participant.entity';
import { EventEntity } from '../../../../../events/infrastructure/persistence/relational/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity('event_participants')
export class EventParticipantEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'uuid', name: 'participante' })
  participante: string;

  @ApiProperty()
  @Column({ type: 'uuid', name: 'evento' })
  evento: string;

  @ManyToOne(() => ParticipantEntity)
  @JoinColumn({ name: 'participante' })
  participant: ParticipantEntity;

  @ManyToOne(() => EventEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evento' })
  event: EventEntity;
}
