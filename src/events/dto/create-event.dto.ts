import {
  IsDateString,
  IsNotEmpty,
  // decorators here
  IsString,
  MinLength,
} from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty({ message: 'Data é obrigatório' })
  data: string;

  @ApiProperty()
  @IsString()
  descricao: string;

  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
