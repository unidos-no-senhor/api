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
  Request,
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
import { AuthService } from '../auth/auth.service';

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
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: Attendance,
  })
  async upsert(
    @Body() createAttendanceDto: CreateAttendanceDto,
    @Request() request,
  ) {
    //get user id from token
    const user = await this.authService.me(request.user);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
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
      user.id.toString(),
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Attendance),
  })
  async findAll(
    @Query() query: Partial<FindAllAttendancesDto>,
  ): Promise<InfinityPaginationResponseDto<Attendance>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }

    return infinityPagination(
      await this.attendancesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        query: {
          evento: query.evento,
        },
      }),
      { page, limit },
    );
  }

  @Get('participants')
  @ApiOkResponse({
    type: InfinityPaginationResponse(ParticipantEntity),
  })
  async findAllParticipants(
    @Query() query: FindAllAttendancesDto,
  ): Promise<InfinityPaginationResponseDto<ParticipantEntity>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }

    return infinityPagination(
      await this.attendancesService.findAllParticipantsWithPagination({
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
