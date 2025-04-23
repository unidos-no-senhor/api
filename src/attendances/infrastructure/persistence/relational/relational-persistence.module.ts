import { Module } from '@nestjs/common';
import { AttendanceRepository } from '../attendance.repository';
import { AttendanceRelationalRepository } from './repositories/attendance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import { ParticipantRepository } from '../participant.repository';
import { ParticipantRelationalRepository } from './repositories/participant.repository';
import { ParticipantEntity } from './entities/participant.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity, ParticipantEntity])],
  providers: [
    {
      provide: AttendanceRepository,
      useClass: AttendanceRelationalRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: ParticipantRelationalRepository,
    },
  ],
  exports: [AttendanceRepository, ParticipantRepository],
})
export class RelationalAttendancePersistenceModule {}
