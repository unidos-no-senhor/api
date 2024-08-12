import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { RelationalAttendancePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalAttendancePersistenceModule],
  controllers: [AttendancesController],
  providers: [AttendancesService],
  exports: [AttendancesService, RelationalAttendancePersistenceModule],
})
export class AttendancesModule {}
