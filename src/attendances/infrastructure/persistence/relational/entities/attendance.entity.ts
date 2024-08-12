import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'attendance',
})
export class AttendanceEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  responsavel_id: string;

  @ApiProperty()
  @Column()
  participante_id: string;

  @ApiProperty()
  @Column()
  evento_id: string;

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
