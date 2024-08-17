import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './infrastructure/persistence/attendance.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Attendance } from './domain/attendance';
import { Event } from '../events/domain/event';
import { ParticipantEntity } from './infrastructure/persistence/relational/entities/participant.entity';
import { AttendanceEntity } from './infrastructure/persistence/relational/entities/attendance.entity';
import { FindAllAttendancesDto } from './dto/find-all-attendances.dto';

@Injectable()
export class AttendancesService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async upsert(
    evento: Event,
    participantes: ParticipantEntity[],
    responsavel: string,
  ) {
    // Se todos os participantes foram removidos da lista de presença, deleta a lista de presença
    if (participantes.length === 0) {
      return await this.attendanceRepository.removeParticipantsByEventId(
        evento.id,
      );
    }

    const participantesIds = participantes.map(
      (participante) => participante.id,
    );

    const participantesJaInseridos =
      await this.attendanceRepository.findByEventIdAndListOfParticipantIds(
        evento.id,
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
      .where('attendance.evento = :eventId', { eventId: evento.id })
      .andWhere('attendance.participante NOT IN (:...participantIds)', {
        participantIds: participantesIds,
      })
      .getMany();

    // Se houver participantes removidos, remove-os da lista de presença
    if (participantesRemovidos.length > 0) {
      const participantesRemovidosIds = participantesRemovidos.map(
        ({ participante }) => participante,
      );

      participantesRemovidosIds.forEach(async (id) => {
        await this.attendanceRepository.removeByEventAndParticipantId(
          evento.id,
          id,
        );
      });
    }

    // Se não tem participantes para inserir, retorna os participantes que já estavam inseridos
    if (participantes.length === 0) {
      return participantesJaInseridos;
    }

    let bulkInsert =
      'INSERT INTO attendance (evento, participante, responsavel) VALUES';
    participantes.forEach((participante) => {
      bulkInsert += `('${evento.id}', '${participante.id}', ${responsavel}),`;
    });

    bulkInsert = bulkInsert.slice(0, -1);

    bulkInsert += ' RETURNING *;';

    return await AttendanceEntity.query(bulkInsert);
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
      },
    });
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
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.attendanceRepository.findAllParticipantsWithPagination({
      paginationOptions,
    });
  }

  findOne(id: Attendance['id']) {
    return this.attendanceRepository.findById(id);
  }

  remove(id: Attendance['id']) {
    return this.attendanceRepository.remove(id);
  }
}
