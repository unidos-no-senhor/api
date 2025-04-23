import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  membro_id: string;
}
