import { Attendance } from '../../../../domain/attendance';
import { AttendanceEntity } from '../entities/attendance.entity';

export class AttendanceMapper {
  static toDomain(raw: AttendanceEntity): Attendance {
    const domainEntity = new Attendance();
    domainEntity.responsavel_id = raw.responsavel_id;
    domainEntity.participante_id = raw.participante_id;
    domainEntity.evento_id = raw.evento_id;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Attendance): AttendanceEntity {
    const persistenceEntity = new AttendanceEntity();
    persistenceEntity.responsavel_id = domainEntity.responsavel_id;
    persistenceEntity.participante_id = domainEntity.participante_id;
    persistenceEntity.evento_id = domainEntity.evento_id;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
