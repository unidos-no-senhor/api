import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { RelationalAttendancePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { EventsModule } from '../events/events.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RelationalAttendancePersistenceModule, EventsModule, AuthModule],
  controllers: [AttendancesController],
  providers: [AttendancesService],
  exports: [AttendancesService, RelationalAttendancePersistenceModule],
})
export class AttendancesModule {}
