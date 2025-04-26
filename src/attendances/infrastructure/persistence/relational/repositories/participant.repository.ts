import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ParticipantEntity } from '../entities/participant.entity';
import { FindAllAttendancesDto } from '../../../../dto/find-all-attendances.dto';
import { ParticipantMapper } from '../mappers/participant.mapper';
import { ParticipantRepository } from '../../participant.repository';
import { In } from 'typeorm';
import { FindAllParticipantsDto } from '../../../../dto/find-all-participants.dto';

@Injectable()
export class ParticipantRelationalRepository implements ParticipantRepository {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  async create(data: ParticipantEntity): Promise<ParticipantEntity> {
    const persistenceModel = ParticipantMapper.toPersistence(data);
    return await this.participantRepository.save(
      this.participantRepository.create(persistenceModel),
    );
  }

  async findAllWithPagination({
    paginationOptions,
    query,
  }: {
    paginationOptions: IPaginationOptions;
    query: FindAllParticipantsDto;
  }): Promise<ParticipantEntity[]> {
    return await this.participantRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        membro_id: query.membro_id,
        nome: query.nome,
      },
    });
  }

  async findById(
    id: ParticipantEntity['id'],
  ): Promise<NullableType<ParticipantEntity>> {
    return await this.participantRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: ParticipantEntity['id'],
    payload: Partial<ParticipantEntity>,
  ): Promise<ParticipantEntity> {
    const entity = await this.participantRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    return await this.participantRepository.save(
      this.participantRepository.create({
        ...entity,
        ...payload,
      }),
    );
  }

  async remove(id: ParticipantEntity['id']): Promise<void> {
    await this.participantRepository.delete(id);
  }

  async findAllParticipantesInArray(
    participantsIds: ParticipantEntity['id'][],
  ): Promise<ParticipantEntity[]> {
    return await this.participantRepository.find({
      where: { id: In(participantsIds) },
    });
  }
}
