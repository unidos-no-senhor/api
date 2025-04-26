import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { AttendanceEntity } from '../entities/attendance.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Attendance } from '../../../../domain/attendance';
import { AttendanceRepository } from '../../attendance.repository';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ParticipantEntity } from '../entities/participant.entity';
import { FindAllAttendancesDto } from '../../../../dto/find-all-attendances.dto';
import { FindAllParticipantsDto } from '../../../../dto/find-all-participants.dto';
import { FindUniqueCodeDto } from '../../../../dto/find-unique-code.dto';

@Injectable()
export class AttendanceRelationalRepository implements AttendanceRepository {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async create(data: Attendance): Promise<Attendance> {
    const persistenceModel = AttendanceMapper.toPersistence(data);
    const newEntity = await this.attendanceRepository.save(
      this.attendanceRepository.create(persistenceModel),
    );
    return AttendanceMapper.toDomain(newEntity);
  }

  async findByCodeAndListOfParticipantIds(
    code: string,
    participantIds: ParticipantEntity['id'][],
  ): Promise<Attendance[]> {
    return await this.attendanceRepository.findBy({
      code: code,
      participante: In(participantIds),
    });
  }

  async findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query: FindAllAttendancesDto;
  }): Promise<Attendance[]> {
    const entities = await this.attendanceRepository.find({
      where: {
        code: query?.code,
        evento: query?.evento,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => AttendanceMapper.toDomain(user));
  }

  async findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ): Promise<ParticipantEntity[]> {
    const participants = await ParticipantEntity.findBy({
      id: In(participantsIds),
    });
    return participants;
  }

  async findAllParticipantsWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: Partial<FindAllParticipantsDto>;
  }): Promise<ParticipantEntity[]> {
    const entities = await ParticipantEntity.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        membro_id: query?.membro_id,
        nome: query?.nome ? Like(`%${query?.nome}%`) : undefined,

      },
    });

    return entities;
  }

  async findByCode(code: Attendance['code']): Promise<NullableType<Attendance>> {
    const entity = await this.attendanceRepository.findOne({
      where: { code },
    });

    return entity ? AttendanceMapper.toDomain(entity) : null;
  }

  async update(
    code: Attendance['code'],
    payload: Partial<Attendance>,
  ): Promise<Attendance> {
    const entity = await this.attendanceRepository.findOne({
      where: { code },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.attendanceRepository.save(
      this.attendanceRepository.create(
        AttendanceMapper.toPersistence({
          ...AttendanceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AttendanceMapper.toDomain(updatedEntity);
  }

  async remove(code: Attendance['code']): Promise<void> {
    await this.attendanceRepository.delete({ code });
  }

  async removeParticipantsByCode(code: string): Promise<void> {
    //delete all participants by code except the one with participant empty
    await this.attendanceRepository.delete({ code, participante: Not('') });
  }

  async removeByCodeAndParticipantId(
    code: string,
    participantId: ParticipantEntity['id'],
  ): Promise<void> {
    await this.attendanceRepository.delete({
      code,
      participante: participantId,
    });
  }

  async findUniqueCode(query: FindUniqueCodeDto): Promise<Attendance[]> {
    if(query.code){
      return await this.attendanceRepository.findBy({ code: query.code });
    }
    return await this.attendanceRepository.createQueryBuilder('attendance')
    .select('DISTINCT ON (code) *')
    .getRawMany();
  }
}
