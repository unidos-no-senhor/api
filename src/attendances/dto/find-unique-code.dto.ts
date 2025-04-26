import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindUniqueCodeDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code?: string;
}
