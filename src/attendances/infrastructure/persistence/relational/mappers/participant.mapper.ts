import { Participant } from '../../../../domain/participant';
import { ParticipantEntity } from '../entities/participant.entity';

export class ParticipantMapper {
  static toDomain(raw: ParticipantEntity): Participant {
    const domainEntity = new Participant();
    domainEntity.id = raw.id;
    domainEntity.nome = raw.nome;
    domainEntity.membro_id = raw.membro_id;

    return domainEntity;
  }

  static toPersistence(domainEntity: Participant): ParticipantEntity {
    const persistenceEntity = new ParticipantEntity();
    persistenceEntity.nome = domainEntity.nome;
    persistenceEntity.membro_id = domainEntity.membro_id;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    return persistenceEntity;
  }
}
