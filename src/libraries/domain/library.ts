import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumberString,
  IsOptional,
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
  @IsOptional()
  @ApiProperty()
  autor: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  editora: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  isbn: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  anoDeImpressao: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  observacao: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  reservado: boolean;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
