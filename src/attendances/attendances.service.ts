import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './infrastructure/persistence/attendance.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Attendance } from './domain/attendance';
import { Event } from '../events/domain/event';
import { ParticipantEntity } from './infrastructure/persistence/relational/entities/participant.entity';
import { AttendanceEntity } from './infrastructure/persistence/relational/entities/attendance.entity';
import { FindAllAttendancesDto } from './dto/find-all-attendances.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantRepository } from './infrastructure/persistence/participant.repository';
import { MemberRepository } from '../members/infrastructure/persistence/member.repository';
import { FindAllParticipantsDto } from './dto/find-all-participants.dto';
import { EventParticipantRepository } from './infrastructure/persistence/event-participant.repository';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';
import { EventParticipantEntity } from './infrastructure/persistence/relational/entities/event-participant.entity';
import { FindAllEventParticipantsDto } from './dto/find-all-event-participants.dto';
import { FindUniqueCodeDto } from './dto/find-unique-code.dto';
@Injectable()
export class AttendancesService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly participantRepository: ParticipantRepository,
    private readonly memberRepository: MemberRepository,
    private readonly eventParticipantRepository: EventParticipantRepository,
  ) { }

  async upsert(
    evento: Event,
    participantes: ParticipantEntity[],
    responsavel: string,
    date: Date,
    code: string,
  ) {
    // Se todos os participantes foram removidos da lista de presença, deleta a lista de presença
    // search for the code, if the code is not found, create a new attendance
    const attendance = await this.attendanceRepository.findByCode(code);
    if (!attendance) {
      return await this.attendanceRepository.create({
        code,
        evento: evento.id,
        participante: '',
        responsavel,
        date,
      });
    }

    if (participantes.length === 0) {
      return await this.attendanceRepository.removeParticipantsByCode(code);
    }


    const participantesIds = participantes.map(
      (participante) => participante.id,
    ).filter((id) => id !== '');

    const participantesJaInseridos =
      await this.attendanceRepository.findByCodeAndListOfParticipantIds(
        code,
        participantesIds,
      );

    if (participantesJaInseridos.length > 0) {
      const participantesJaInseridosIds = participantesJaInseridos.map(
        (participante) => participante.participante,
      );
      participantes = participantes.filter(
        (participante) =>
          !participantesJaInseridosIds.includes(participante.id),
      );
    }

    // Procura por participantes removidos
    const participantesRemovidos = await AttendanceEntity.createQueryBuilder(
      'attendance',
    )
      .where('attendance.code = :code', { code })
      .andWhere('attendance.participante NOT IN (:...participantIds)', {
        participantIds: participantesIds,
      })
      .getMany();

    // Se houver participantes removidos, remove-os da lista de presença
    if (participantesRemovidos.length > 0) {
      const participantesRemovidosIds = participantesRemovidos.map(
        ({ participante }) => participante,
      ).filter((id) => id !== '');

      participantesRemovidosIds.forEach(async (id) => {
        await this.attendanceRepository.removeByCodeAndParticipantId(
          code,
          id,
        );
      });
    }

    // Se não tem participantes para inserir, retorna os participantes que já estavam inseridos
    if (participantes.length === 0) {
      return participantesJaInseridos;
    }

    let bulkInsert =
      'INSERT INTO attendance (code, evento, participante, responsavel, date) VALUES';
    participantes.forEach((participante) => {
      bulkInsert += `('${code}', '${evento.id}', '${participante.id}', '${responsavel}', Date('${date}')),`;
    });

    bulkInsert = bulkInsert.slice(0, -1);

    bulkInsert += ' RETURNING *;';

    return await AttendanceEntity.query(bulkInsert);
  }

  async findUniqueCode(query: FindUniqueCodeDto) {
    return this.attendanceRepository.findUniqueCode(query);
  }

  findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: Partial<FindAllAttendancesDto>;
  }) {
    return this.attendanceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      query: {
        evento: query?.evento,
        code: query?.code,
      },
    });
  }

  async createEventParticipant(
    createEventParticipantDto: CreateEventParticipantDto,
  ) {
    //verify if someone was removed from the list of participants
    const eventParticipants = await this.eventParticipantRepository.findAllByEventId(createEventParticipantDto.evento);
    const eventParticipantsIds = eventParticipants.map((participant) => participant.participante);
    const participantsToInsert = createEventParticipantDto.participantes.filter((participant) => !eventParticipantsIds.includes(participant));
    const participantsToRemove = eventParticipants.filter((participant) => !createEventParticipantDto.participantes.includes(participant.participante));
    for (const participante of participantsToRemove) {
      await this.eventParticipantRepository.remove(participante.id);
    }
    if (participantsToInsert.length === 0) {
      return eventParticipants;
    }
    let bulkInsert = 'INSERT INTO event_participants (participante, evento) VALUES';
    for (const participante of participantsToInsert) {
      if (participante) {
        bulkInsert += `('${participante}', '${createEventParticipantDto.evento}'),`;
      }
    }
    bulkInsert = bulkInsert.slice(0, -1);
    bulkInsert += ' RETURNING *;';
    await EventParticipantEntity.query(bulkInsert);
    return await this.eventParticipantRepository.findAllByEventId(createEventParticipantDto.evento);
  }

  async findAllEventParticipants(query: FindAllEventParticipantsDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 200) {
      limit = 200;
    }
    return this.eventParticipantRepository.findAllWithPagination({
      paginationOptions: {
        page: page,
        limit: query.limit ?? 10,
      },
      query: {
        evento_id: query.evento_id,
        participante_id: query.participante_id,
      },
    });
  }

  async createParticipant(createParticipantDto: CreateParticipantDto) {
    if (!createParticipantDto.membro_id) {
      const member = await this.memberRepository.create({
        nome: String(createParticipantDto.nome),
        situacao: 'VISITANTE',
        observacao: null,
        dataSaida: null,
        dataEntrada: null,
        conjuge: null,
        cep: null,
        cidade: null,
        bairro: null,
        endereco: null,
        cargo: null,
        dataBatismo: null,
        dataNascimento: null,
        telefone: null,
        email: null,
      });

      createParticipantDto.membro_id = member.id || '';
    }
    return this.participantRepository.create(createParticipantDto);
  }

  async findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ) {
    return await this.attendanceRepository.findAllParticipantesInArray(
      participantsIds,
    );
  }

  async findAllParticipantsWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: Partial<FindAllParticipantsDto>;
  }) {
    return this.attendanceRepository.findAllParticipantsWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      query: {
        membro_id: query?.membro_id,
        nome: query?.nome,
      },
    });
  }

  findOne(code: Attendance['code']) {
    return this.attendanceRepository.findByCode(code);
  }

  remove(code: Attendance['code']) {
    return this.attendanceRepository.remove(code);
  }
}
