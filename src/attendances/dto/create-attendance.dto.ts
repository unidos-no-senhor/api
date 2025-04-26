import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsDateString()
  date: Date;

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
