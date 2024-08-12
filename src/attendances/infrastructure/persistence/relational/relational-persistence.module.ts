import { Module } from '@nestjs/common';
import { AttendanceRepository } from '../attendance.repository';
import { AttendanceRelationalRepository } from './repositories/attendance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entities/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity])],
  providers: [
    {
      provide: AttendanceRepository,
      useClass: AttendanceRelationalRepository,
    },
  ],
  exports: [AttendanceRepository],
})
export class RelationalAttendancePersistenceModule {}
