import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './infrastructure/persistence/member.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Member } from './domain/member';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository) {}

  create(createMemberDto: CreateMemberDto) {
    return this.memberRepository.create(createMemberDto);
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
