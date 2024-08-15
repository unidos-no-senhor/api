import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Attendance } from './domain/attendance';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAttendancesDto } from './dto/find-all-attendances.dto';
import { EventsService } from '../events/events.service';
import { ParticipantEntity } from './infrastructure/persistence/relational/entities/participant.entity';

@ApiTags('Attendances')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'attendances',
  version: '1',
})
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    private readonly eventsService: EventsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: Attendance,
  })
  async upsert(@Body() createAttendanceDto: CreateAttendanceDto) {
    const evento = await this.eventsService.findOne(createAttendanceDto.evento);
    if (!evento) {
      throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
    }
    let participantes: ParticipantEntity[] = [];
    if (createAttendanceDto.participante.length !== 0) {
      participantes = await this.attendancesService.findAllParticipantesInArray(
        createAttendanceDto.participante,
      );
    }

    return this.attendancesService.upsert(
      evento,
      participantes,
      createAttendanceDto.responsavel,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Attendance),
  })
  async findAll(
    @Query() query: FindAllAttendancesDto,
  ): Promise<InfinityPaginationResponseDto<Attendance>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.attendancesService.findAllWithPagination({
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
    type: Attendance,
  })
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(id);
  }
}
