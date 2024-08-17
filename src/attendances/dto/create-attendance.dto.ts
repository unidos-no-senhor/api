import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  participante: string[];

  @ApiProperty()
  @IsUUID('4')
  @IsString()
  @IsNotEmpty()
  evento: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
