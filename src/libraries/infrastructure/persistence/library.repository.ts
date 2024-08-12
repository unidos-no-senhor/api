import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Library } from '../../domain/library';

export abstract class LibraryRepository {
  abstract create(
    data: Omit<Library, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Library>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Library[]>;

  abstract findById(id: Library['id']): Promise<NullableType<Library>>;

  abstract update(
    id: Library['id'],
    payload: DeepPartial<Library>,
  ): Promise<Library | null>;

  abstract remove(id: Library['id']): Promise<void>;
}
