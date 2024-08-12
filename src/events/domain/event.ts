import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty()
  data: string;

  @ApiProperty()
  descricao: string;

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
