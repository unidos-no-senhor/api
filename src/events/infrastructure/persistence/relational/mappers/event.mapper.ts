import { Event } from '../../../../domain/event';
import { EventEntity } from '../entities/event.entity';

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    const domainEntity = new Event();
    domainEntity.data = raw.data;
    domainEntity.descricao = raw.descricao;
    domainEntity.nome = raw.nome;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Event): EventEntity {
    const persistenceEntity = new EventEntity();
    persistenceEntity.data = domainEntity.data;
    persistenceEntity.descricao = domainEntity.descricao;
    persistenceEntity.nome = domainEntity.nome;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
