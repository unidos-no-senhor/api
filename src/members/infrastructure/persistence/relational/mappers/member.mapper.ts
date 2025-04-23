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
    persistenceEntity.observacao = domainEntity.observacao || null;
    persistenceEntity.situacao = domainEntity.situacao || null;
    persistenceEntity.dataSaida = domainEntity.dataSaida || null;
    persistenceEntity.dataEntrada = domainEntity.dataEntrada || null;
    persistenceEntity.conjuge = domainEntity.conjuge || null;
    persistenceEntity.cep = domainEntity.cep || null;
    persistenceEntity.cidade = domainEntity.cidade || null;
    persistenceEntity.bairro = domainEntity.bairro || null;
    persistenceEntity.endereco = domainEntity.endereco || null;
    persistenceEntity.cargo = domainEntity.cargo || null;
    persistenceEntity.dataBatismo = domainEntity.dataBatismo || null;
    persistenceEntity.dataNascimento = domainEntity.dataNascimento || null;
    persistenceEntity.telefone = domainEntity.telefone || null;
    persistenceEntity.email = domainEntity.email || null;
    persistenceEntity.nome = domainEntity.nome;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt || new Date();
    persistenceEntity.updatedAt = domainEntity.updatedAt || new Date();

    return persistenceEntity;
  }
}
