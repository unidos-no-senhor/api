import { Member } from '../../../../domain/member';
import { MemberEntity } from '../entities/member.entity';

export class MemberMapper {
  static toDomain(raw: MemberEntity): Member {
    const domainEntity = new Member();
    domainEntity.observacao = raw.observacao;
    domainEntity.situacao = raw.situacao;
    domainEntity.dataSaida = raw.dataSaida;
    domainEntity.dataEntrada = raw.dataEntrada;
    domainEntity.conjuge = raw.conjuge;
    domainEntity.cep = raw.cep;
    domainEntity.cidade = raw.cidade;
    domainEntity.bairro = raw.bairro;
    domainEntity.endereco = raw.endereco;
    domainEntity.cargo = raw.cargo;
    domainEntity.dataBatismo = raw.dataBatismo;
    domainEntity.dataNascimento = raw.dataNascimento;
    domainEntity.telefone = raw.telefone;
    domainEntity.email = raw.email;
    domainEntity.nome = raw.nome;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Member): MemberEntity {
    const persistenceEntity = new MemberEntity();
    persistenceEntity.observacao = domainEntity.observacao;
    persistenceEntity.situacao = domainEntity.situacao;
    persistenceEntity.dataSaida = domainEntity.dataSaida;
    persistenceEntity.dataEntrada = domainEntity.dataEntrada;
    persistenceEntity.conjuge = domainEntity.conjuge;
    persistenceEntity.cep = domainEntity.cep;
    persistenceEntity.cidade = domainEntity.cidade;
    persistenceEntity.bairro = domainEntity.bairro;
    persistenceEntity.endereco = domainEntity.endereco;
    persistenceEntity.cargo = domainEntity.cargo;
    persistenceEntity.dataBatismo = domainEntity.dataBatismo;
    persistenceEntity.dataNascimento = domainEntity.dataNascimento;
    persistenceEntity.telefone = domainEntity.telefone;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.nome = domainEntity.nome;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
