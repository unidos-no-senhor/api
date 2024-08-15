import { EventEntity } from '../../../events/infrastructure/persistence/relational/entities/event.entity';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Attendance } from '../../domain/attendance';
import { ParticipantEntity } from './relational/entities/participant.entity';

export abstract class AttendanceRepository {
  abstract create(
    data: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Attendance>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Attendance[]>;

  abstract findByEventIdAndListOfParticipantIds(
    eventId: EventEntity['id'],
    participantIds: ParticipantEntity['id'][],
  ): Promise<Attendance[]>;

  abstract findById(id: Attendance['id']): Promise<NullableType<Attendance>>;

  abstract update(
    id: Attendance['id'],
    payload: DeepPartial<Attendance>,
  ): Promise<Attendance | null>;

  abstract remove(id: Attendance['id']): Promise<void>;

  abstract removeByEventId(eventId: EventEntity['id']): Promise<void>;

  abstract removeByEventAndParticipantId(
    eventId: EventEntity['id'],
    participantId: ParticipantEntity['id'],
  ): Promise<void>;

  abstract findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ): Promise<ParticipantEntity[]>;
}
