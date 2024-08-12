import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DateFormat } from '../../../../../utils/date-format';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity({
  name: 'event',
})
export class EventEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date' })
  data: string;

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

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
