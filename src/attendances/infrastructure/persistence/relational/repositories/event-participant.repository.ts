import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventParticipantEntity } from '../entities/event-participant.entity';
import { EventParticipantRepository } from '../../event-participant.repository';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { EventParticipantMapper } from '../mappers/event-participant.mapper';
import { FindAllParticipantsDto } from '../../../../dto/find-all-participants.dto';
import { FindAllEventParticipantsDto } from '../../../../dto/find-all-event-participants.dto';

@Injectable()
export class EventParticipantRelationalRepository
  implements EventParticipantRepository {
  constructor(
    @InjectRepository(EventParticipantEntity)
    private readonly eventParticipantRepository: Repository<EventParticipantEntity>,
  ) { }

  async create(data: EventParticipantEntity): Promise<EventParticipantEntity> {
    const persistenceModel = EventParticipantMapper.toPersistence(data);
    return await this.eventParticipantRepository.save(
      this.eventParticipantRepository.create(persistenceModel),
    );
  }

  async findAllByEventId(eventId: string): Promise<EventParticipantEntity[]> {
    return await this.eventParticipantRepository.find({
      where: { evento: eventId },
    });
  }

  async upsert(data: EventParticipantEntity): Promise<EventParticipantEntity | null> {
    const existingEntity = await this.eventParticipantRepository.findOne({
      where: {
        participante: data.participante,
        evento: data.evento,
      },
    });

    if (existingEntity && existingEntity.id) {
      await this.eventParticipantRepository.update(existingEntity.id, data);
      return this.findById(existingEntity.id);
    } else {
      return await this.create(data);
    }
  }

  async findById(id: string): Promise<EventParticipantEntity | null> {
    return await this.eventParticipantRepository.findOne({
      where: { id },
    });
  }

  async findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query?: FindAllEventParticipantsDto;
  }): Promise<EventParticipantEntity[]> {
    const queryBuilder = this.eventParticipantRepository.createQueryBuilder('event_participants')
      .leftJoinAndSelect('participant_entity', 'participant', 'event_participants.participante = participant.id')
      .select(['event_participants.*', 'participant.nome'])
      .where('event_participants.evento = :eventoId', { eventoId: query?.evento_id });

    if (query?.participante_id) {
      queryBuilder.andWhere('event_participants.participante = :participanteId', { participanteId: query.participante_id });
    }

    queryBuilder.skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    return await queryBuilder.getRawMany();
    // return await this.eventParticipantRepository.find({
    //   where: {
    //     evento: query?.evento_id,
    //     participante: query?.participante_id,
    //   },

    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    // });
  }

  async remove(id: string): Promise<void> {
    await this.eventParticipantRepository.delete(id);
  }

  async removeByEventId(eventId: string): Promise<void> {
    await this.eventParticipantRepository.delete({ evento: eventId });
  }

  async removeByParticipantId(participantId: string): Promise<void> {
    await this.eventParticipantRepository.delete({
      participante: participantId,
    });
  }

  async update(
    id: string,
    data: EventParticipantEntity,
  ): Promise<EventParticipantEntity | null> {
    await this.eventParticipantRepository.update(id, data);
    return this.findById(id);
  }
}
