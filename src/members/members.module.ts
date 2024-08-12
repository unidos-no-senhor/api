import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { RelationalMemberPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalMemberPersistenceModule],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService, RelationalMemberPersistenceModule],
})
export class MembersModule {}
