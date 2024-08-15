import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  // decorators here
  IsString,
  MinLength,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateLibraryDto {
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
}
