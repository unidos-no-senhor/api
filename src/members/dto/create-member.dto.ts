import {
  IsOptional,
  // decorators here
  IsString,
} from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty()
  @ApiProperty()
  @IsString()
  observacao: string;

  @ApiProperty()
  @IsString()
  situacao: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dataSaida: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dataEntrada: string;

  @ApiProperty()
  @IsString()
  conjuge: string;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsString()
  bairro: string;

  @ApiProperty()
  @IsString()
  endereco: string;

  @ApiProperty()
  @IsString()
  cargo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dataBatismo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dataNascimento: string;

  @ApiProperty()
  @IsString()
  telefone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  nome: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
