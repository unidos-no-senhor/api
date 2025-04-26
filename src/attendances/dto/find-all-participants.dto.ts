import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllParticipantsDto {
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
  membro_id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nome?: string;
}
