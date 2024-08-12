import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Library } from './domain/library';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLibrariesDto } from './dto/find-all-libraries.dto';

@ApiTags('Libraries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'libraries',
  version: '1',
})
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Library,
  })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.librariesService.create(createLibraryDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Library),
  })
  async findAll(
    @Query() query: FindAllLibrariesDto,
  ): Promise<InfinityPaginationResponseDto<Library>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.librariesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Library,
  })
  findOne(@Param('id') id: string) {
    return this.librariesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Library,
  })
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.librariesService.update(id, updateLibraryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.librariesService.remove(id);
  }
}
