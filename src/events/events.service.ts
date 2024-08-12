import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './infrastructure/persistence/event.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Event } from './domain/event';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  create(createEventDto: CreateEventDto) {
    return this.eventRepository.create(createEventDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.eventRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Event['id']) {
    return this.eventRepository.findById(id);
  }

  update(id: Event['id'], updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  remove(id: Event['id']) {
    return this.eventRepository.remove(id);
  }
}
