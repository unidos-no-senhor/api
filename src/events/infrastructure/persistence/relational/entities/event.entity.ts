import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AttendanceEntity } from '../../../../../attendances/infrastructure/persistence/relational/entities/attendance.entity';
import { EventParticipantEntity } from '../../../../../attendances/infrastructure/persistence/relational/entities/event-participant.entity';

@Entity({
  name: 'event',
})
export class EventEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  descricao: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Column()
  nome: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.evento)
  attendances: AttendanceEntity[];

  @OneToMany(() => EventParticipantEntity, (eventParticipant) => eventParticipant.event)
  eventParticipants: EventParticipantEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
