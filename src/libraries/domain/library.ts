import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumberString,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class Library {
  @ApiProperty()
  @IsString()
  @IsUUID('4')
  id: string;

  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Título deve ter no mínimo 3 caracteres' })
  titulo: string;

  @IsString()
  @ApiProperty()
  autor: string;

  @IsString()
  @ApiProperty()
  editora: string;

  @IsString()
  @ApiProperty()
  isbn: string;

  @IsNumberString()
  @ApiProperty()
  anoDeImpressao: string;

  @IsString()
  @ApiProperty()
  observacao: string;

  @ApiProperty()
  @IsBoolean()
  reservado: boolean;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
