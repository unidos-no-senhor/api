import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceRepository } from './infrastructure/persistence/attendance.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Attendance } from './domain/attendance';

@Injectable()
export class AttendancesService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.create(createAttendanceDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.attendanceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Attendance['id']) {
    return this.attendanceRepository.findById(id);
  }

  update(id: Attendance['id'], updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepository.update(id, updateAttendanceDto);
  }

  remove(id: Attendance['id']) {
    return this.attendanceRepository.remove(id);
  }
}
