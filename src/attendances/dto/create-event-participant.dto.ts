import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateEventParticipantDto {
  @IsArray()
  @ApiProperty()
  participantes: string[];
  @IsString()
  @ApiProperty()
  evento: string;
}
