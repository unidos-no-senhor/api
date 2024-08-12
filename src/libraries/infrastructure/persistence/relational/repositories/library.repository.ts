import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryEntity } from '../entities/library.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Library } from '../../../../domain/library';
import { LibraryRepository } from '../../library.repository';
import { LibraryMapper } from '../mappers/library.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LibraryRelationalRepository implements LibraryRepository {
  constructor(
    @InjectRepository(LibraryEntity)
    private readonly libraryRepository: Repository<LibraryEntity>,
  ) {}

  async create(data: Library): Promise<Library> {
    const persistenceModel = LibraryMapper.toPersistence(data);
    const newEntity = await this.libraryRepository.save(
      this.libraryRepository.create(persistenceModel),
    );
    return LibraryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Library[]> {
    const entities = await this.libraryRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => LibraryMapper.toDomain(user));
  }

  async findById(id: Library['id']): Promise<NullableType<Library>> {
    const entity = await this.libraryRepository.findOne({
      where: { id },
    });

    return entity ? LibraryMapper.toDomain(entity) : null;
  }

  async update(id: Library['id'], payload: Partial<Library>): Promise<Library> {
    const entity = await this.libraryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.libraryRepository.save(
      this.libraryRepository.create(
        LibraryMapper.toPersistence({
          ...LibraryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LibraryMapper.toDomain(updatedEntity);
  }

  async remove(id: Library['id']): Promise<void> {
    await this.libraryRepository.delete(id);
  }
}
