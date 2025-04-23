import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Participant } from '../../domain/participant';
import { FindAllParticipantsDto } from '../../dto/find-all-participants.dto';
import { ParticipantEntity } from './relational/entities/participant.entity';

export abstract class ParticipantRepository {
  abstract create(
    data: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Participant>;

  abstract findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: FindAllParticipantsDto;
  }): Promise<Participant[]>;


  abstract findById(id: Participant['id']): Promise<NullableType<Participant>>;

  abstract update(
    id: Participant['id'],
    payload: DeepPartial<Participant>,
  ): Promise<Participant | null>;

  abstract remove(id: Participant['id']): Promise<void>;



  abstract findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ): Promise<ParticipantEntity[]>;
}
