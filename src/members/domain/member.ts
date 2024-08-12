import { ApiProperty } from '@nestjs/swagger';

export class Member {
  @ApiProperty()
  observacao: string;

  @ApiProperty()
  situacao: string;

  @ApiProperty()
  dataSaida: string;

  @ApiProperty()
  dataEntrada: string;

  @ApiProperty()
  conjuge: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  cidade: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  cargo: string;

  @ApiProperty()
  dataBatismo: string;

  @ApiProperty()
  dataNascimento: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
