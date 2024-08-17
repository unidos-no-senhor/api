import {
  IsDateString,
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
  @IsString()
  @IsOptional()
  observacao: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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
  @IsOptional()
  conjuge: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cep: string;

  @ApiProperty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bairro: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  endereco: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cargo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dataBatismo: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dataNascimento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  nome: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
