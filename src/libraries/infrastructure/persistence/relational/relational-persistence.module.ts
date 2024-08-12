import { Module } from '@nestjs/common';
import { LibraryRepository } from '../library.repository';
import { LibraryRelationalRepository } from './repositories/library.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryEntity } from './entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntity])],
  providers: [
    {
      provide: LibraryRepository,
      useClass: LibraryRelationalRepository,
    },
  ],
  exports: [LibraryRepository],
})
export class RelationalLibraryPersistenceModule {}
