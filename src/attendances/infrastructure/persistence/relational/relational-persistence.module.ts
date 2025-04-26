import { Module } from '@nestjs/common';
import { AttendanceRepository } from '../attendance.repository';
import { AttendanceRelationalRepository } from './repositories/attendance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import { ParticipantRepository } from '../participant.repository';
import { ParticipantRelationalRepository } from './repositories/participant.repository';
import { ParticipantEntity } from './entities/participant.entity';
import { EventParticipantEntity } from './entities/event-participant.entity';
import { EventParticipantRepository } from '../event-participant.repository';
import { EventParticipantRelationalRepository } from './repositories/event-participant.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendanceEntity,
      ParticipantEntity,
      EventParticipantEntity,
    ]),
  ],
  providers: [
    {
      provide: AttendanceRepository,
      useClass: AttendanceRelationalRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: ParticipantRelationalRepository,
    },
    {
      provide: EventParticipantRepository,
      useClass: EventParticipantRelationalRepository,
    },
  ],
  exports: [
    AttendanceRepository,
    ParticipantRepository,
    EventParticipantRepository,
  ],
})
export class RelationalAttendancePersistenceModule {}
