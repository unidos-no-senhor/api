import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Attendance } from '../../domain/attendance';

export abstract class AttendanceRepository {
  abstract create(
    data: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Attendance>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Attendance[]>;

  abstract findById(id: Attendance['id']): Promise<NullableType<Attendance>>;

  abstract update(
    id: Attendance['id'],
    payload: DeepPartial<Attendance>,
  ): Promise<Attendance | null>;

  abstract remove(id: Attendance['id']): Promise<void>;
}
