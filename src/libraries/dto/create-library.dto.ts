import {
  IsBoolean,
  IsNumberString,
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
}
