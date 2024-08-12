import {
  // decorators here

  IsString,
} from 'class-validator';
import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  @ApiProperty()
  @IsString()
  responsavel_id: string;

  @ApiProperty()
  @IsString()
  participante_id: string;

  @IsString()
  evento_id: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
