import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { RelationalEventPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalEventPersistenceModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, RelationalEventPersistenceModule],
})
export class EventsModule {}
