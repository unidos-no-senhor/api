import { EventParticipant } from '../../../../domain/event-participant';
import { EventParticipantEntity } from '../entities/event-participant.entity';

export class EventParticipantMapper {
  static toDomain(raw: EventParticipantEntity): EventParticipant {
    const domainEntity = new EventParticipant();
    domainEntity.id = raw.id;
    domainEntity.participante = raw.participante;
    domainEntity.evento = raw.evento;

    return domainEntity;
  }

  static toPersistence(domainEntity: EventParticipant): EventParticipantEntity {
    const persistenceEntity = new EventParticipantEntity();
    persistenceEntity.participante = domainEntity.participante;
    persistenceEntity.evento = domainEntity.evento;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    return persistenceEntity;
  }
}
