import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipantEntity } from './participant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EventEntity } from '../../../../../events/infrastructure/persistence/relational/entities/event.entity';
import { IsString } from 'class-validator';

@Entity({
  name: 'attendance',
})
export class AttendanceEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  @IsString()
  @ManyToOne(() => UserEntity, (user) => user.id)
  responsavel: string;

  @ApiProperty()
  @Column()
  @OneToOne(() => ParticipantEntity, (participant) => participant.id)
  participante: string;

  @ApiProperty()
  @Column()
  @ManyToOne(() => EventEntity, (event) => event.id)
  evento: string;

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
