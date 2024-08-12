import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '../entities/member.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Member } from '../../../../domain/member';
import { MemberRepository } from '../../member.repository';
import { MemberMapper } from '../mappers/member.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class MemberRelationalRepository implements MemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async create(data: Member): Promise<Member> {
    const persistenceModel = MemberMapper.toPersistence(data);
    const newEntity = await this.memberRepository.save(
      this.memberRepository.create(persistenceModel),
    );
    return MemberMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Member[]> {
    const entities = await this.memberRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => MemberMapper.toDomain(user));
  }

  async findById(id: Member['id']): Promise<NullableType<Member>> {
    const entity = await this.memberRepository.findOne({
      where: { id },
    });

    return entity ? MemberMapper.toDomain(entity) : null;
  }

  async update(id: Member['id'], payload: Partial<Member>): Promise<Member> {
    const entity = await this.memberRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.memberRepository.save(
      this.memberRepository.create(
        MemberMapper.toPersistence({
          ...MemberMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MemberMapper.toDomain(updatedEntity);
  }

  async remove(id: Member['id']): Promise<void> {
    await this.memberRepository.delete(id);
  }
}
