import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './infrastructure/persistence/member.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Member } from './domain/member';
import { ParticipantEntity } from '../attendances/infrastructure/persistence/relational/entities/participant.entity';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = await this.memberRepository.create(createMemberDto);
    await ParticipantEntity.create({
      nome: member.nome,
      membro_id: member.id,
    }).save();

    return member;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.memberRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Member['id']) {
    return this.memberRepository.findById(id);
  }

  update(id: Member['id'], updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update(id, updateMemberDto);
  }

  remove(id: Member['id']) {
    return this.memberRepository.remove(id);
  }
}
