import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllEventParticipantsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  evento_id?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  participante_id?: string;
}
