import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceEntity } from '../entities/attendance.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Attendance } from '../../../../domain/attendance';
import { AttendanceRepository } from '../../attendance.repository';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AttendanceRelationalRepository implements AttendanceRepository {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async create(data: Attendance): Promise<Attendance> {
    const persistenceModel = AttendanceMapper.toPersistence(data);
    const newEntity = await this.attendanceRepository.save(
      this.attendanceRepository.create(persistenceModel),
    );
    return AttendanceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Attendance[]> {
    const entities = await this.attendanceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => AttendanceMapper.toDomain(user));
  }

  async findById(id: Attendance['id']): Promise<NullableType<Attendance>> {
    const entity = await this.attendanceRepository.findOne({
      where: { id },
    });

    return entity ? AttendanceMapper.toDomain(entity) : null;
  }

  async update(
    id: Attendance['id'],
    payload: Partial<Attendance>,
  ): Promise<Attendance> {
    const entity = await this.attendanceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.attendanceRepository.save(
      this.attendanceRepository.create(
        AttendanceMapper.toPersistence({
          ...AttendanceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AttendanceMapper.toDomain(updatedEntity);
  }

  async remove(id: Attendance['id']): Promise<void> {
    await this.attendanceRepository.delete(id);
  }
}
