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
  ParseUUIDPipe,
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
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('Libraries')
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
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.librariesService.create(createLibraryDto);
  }

  @Get()
  @UseGuards()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Library),
  })
  async findAll(
    @Query() query: FindAllLibrariesDto,
  ): Promise<InfinityPaginationResponseDto<Library>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
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
    type: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: Library,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.librariesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    type: Library,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.librariesService.update(id, updateLibraryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'uuid',
    required: true,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.librariesService.remove(id);
  }
}
