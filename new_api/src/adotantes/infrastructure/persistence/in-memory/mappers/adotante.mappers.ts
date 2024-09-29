import { Adotante } from 'src/adotantes/domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';
import { PessoaMapper } from 'src/pessoas/infrastructure/persistence/in-memory/mappers/pessoa.mapper';
import { AdocaoMapper } from 'src/adocoes/infrastructure/persistence/in-memory/mappers/adocoes.mapper';

export class AdotanteMapper {
  static paraDominio(adotanteEntity: AdotanteEntity): Adotante {
    const { id, renda, condicao_entrevista, pessoa_id, pessoa, adocao } = adotanteEntity;

    return new Adotante(
      id,
      renda,
      condicao_entrevista,
      adocao?.map(AdocaoMapper.paraDominio) || [], 
      pessoa_id, 
      pessoa.nome,
      pessoa.cep,
      pessoa.endereco,
      pessoa.telefone,
      pessoa.email,
      pessoa.cpf
    );
  }

  static paraPersistencia(adotante: Adotante): AdotanteEntity {
    const entity = new AdotanteEntity();

    entity.id = adotante.id; 
    entity.renda = adotante.renda;
    entity.condicao_entrevista = adotante.condicao_entrevista;
    entity.pessoa_id = adotante.id; 
    entity.pessoa = PessoaMapper.paraPersistencia(adotante); 
    entity.adocao = adotante.adocao?.map(AdocaoMapper.paraPersistencia) || [];

    return entity;
  }
}

