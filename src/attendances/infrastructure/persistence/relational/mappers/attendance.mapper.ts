import { Attendance } from '../../../../domain/attendance';
import { AttendanceEntity } from '../entities/attendance.entity';

export class AttendanceMapper {
  static toDomain(raw: AttendanceEntity): Attendance {
    const domainEntity = new Attendance();
    domainEntity.code = raw.code;
    domainEntity.date = raw.date;
    domainEntity.responsavel = raw.responsavel;
    domainEntity.participante = raw.participante;
    domainEntity.evento = raw.evento;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Attendance): AttendanceEntity {
    const persistenceEntity = new AttendanceEntity();
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.date = domainEntity.date;
    persistenceEntity.responsavel = domainEntity.responsavel;
    persistenceEntity.participante = domainEntity.participante;
    persistenceEntity.evento = domainEntity.evento;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
