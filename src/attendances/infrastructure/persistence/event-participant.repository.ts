import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EventParticipant } from '../../domain/event-participant';
import { FindAllEventParticipantsDto } from '../../dto/find-all-event-participants.dto';

export abstract class EventParticipantRepository {
  abstract create(
    data: Omit<EventParticipant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<EventParticipant>;

  abstract upsert(
    data: Omit<EventParticipant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<EventParticipant | null>;

  abstract findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: FindAllEventParticipantsDto;
  }): Promise<EventParticipant[]>;

  abstract findById(
    id: EventParticipant['id'],
  ): Promise<NullableType<EventParticipant>>;

  abstract update(
    id: EventParticipant['id'],
    payload: DeepPartial<EventParticipant>,
  ): Promise<EventParticipant | null>;

  abstract findAllByEventId(eventId: string): Promise<EventParticipant[]>;

  abstract remove(id: EventParticipant['id']): Promise<void>;

  abstract removeByEventId(eventId: string): Promise<void>;

  abstract removeByParticipantId(participantId: string): Promise<void>;
}
