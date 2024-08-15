import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  responsavel: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  participante: string[];

  @IsUUID('4')
  @IsString()
  @IsNotEmpty()
  evento: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
