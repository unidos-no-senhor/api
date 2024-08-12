import { Module } from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { LibrariesController } from './libraries.controller';
import { RelationalLibraryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLibraryPersistenceModule],
  controllers: [LibrariesController],
  providers: [LibrariesService],
  exports: [LibrariesService, RelationalLibraryPersistenceModule],
})
export class LibrariesModule {}
