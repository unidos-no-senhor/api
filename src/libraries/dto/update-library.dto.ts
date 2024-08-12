// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateLibraryDto } from './create-library.dto';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {}
