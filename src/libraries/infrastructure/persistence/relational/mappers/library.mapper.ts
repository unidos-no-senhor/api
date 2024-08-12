import { Library } from '../../../../domain/library';
import { LibraryEntity } from '../entities/library.entity';

export class LibraryMapper {
  static toDomain(raw: LibraryEntity): Library {
    const domainEntity = new Library();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Library): LibraryEntity {
    const persistenceEntity = new LibraryEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
