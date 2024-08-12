import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibraryRepository } from './infrastructure/persistence/library.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Library } from './domain/library';

@Injectable()
export class LibrariesService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  create(createLibraryDto: CreateLibraryDto) {
    return this.libraryRepository.create(createLibraryDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.libraryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Library['id']) {
    return this.libraryRepository.findById(id);
  }

  update(id: Library['id'], updateLibraryDto: UpdateLibraryDto) {
    return this.libraryRepository.update(id, updateLibraryDto);
  }

  remove(id: Library['id']) {
    return this.libraryRepository.remove(id);
  }
}
