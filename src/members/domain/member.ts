import { ApiProperty } from '@nestjs/swagger';

export class Member {
  @ApiProperty()
  observacao: string | null;

  @ApiProperty()
  situacao: string | null;

  @ApiProperty()
  dataSaida: string | null;

  @ApiProperty()
  dataEntrada: string | null;

  @ApiProperty()
  conjuge: string | null;

  @ApiProperty()
  cep: string | null;

  @ApiProperty()
  cidade: string | null;

  @ApiProperty()
  bairro: string | null;

  @ApiProperty()
  endereco: string | null;

  @ApiProperty()
  cargo: string | null;

  @ApiProperty()
  dataBatismo: string | null;

  @ApiProperty()
  dataNascimento: string | null;

  @ApiProperty()
  telefone: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  nome: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;
}
