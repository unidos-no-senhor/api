import { EventEntity } from '../../../events/infrastructure/persistence/relational/entities/event.entity';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Attendance } from '../../domain/attendance';
import { FindAllAttendancesDto } from '../../dto/find-all-attendances.dto';
import { FindAllParticipantsDto } from '../../dto/find-all-participants.dto';
import { FindUniqueCodeDto } from '../../dto/find-unique-code.dto';
import { ParticipantEntity } from './relational/entities/participant.entity';

export abstract class AttendanceRepository {
  abstract create(
    data: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Attendance>;

  abstract findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: FindAllAttendancesDto;
  }): Promise<Attendance[]>;

  abstract findByCodeAndListOfParticipantIds(
    code: string,
    participantIds: ParticipantEntity['id'][],
  ): Promise<Attendance[]>;

  abstract findByCode(code: string): Promise<NullableType<Attendance>>;

  abstract update(
    code: Attendance['code'],
    payload: DeepPartial<Attendance>,
  ): Promise<Attendance | null>;

  abstract remove(code: Attendance['code']): Promise<void>;

  abstract removeParticipantsByCode(
    code: string,
  ): Promise<void>;

  abstract removeByCodeAndParticipantId(
    code: string,
    participantId: ParticipantEntity['id'],
  ): Promise<void>;

  abstract findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ): Promise<ParticipantEntity[]>;

  abstract findAllParticipantsWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: Partial<FindAllParticipantsDto>;
  }): Promise<ParticipantEntity[]>;

  abstract findUniqueCode(query: FindUniqueCodeDto): Promise<Attendance[]>;
}
