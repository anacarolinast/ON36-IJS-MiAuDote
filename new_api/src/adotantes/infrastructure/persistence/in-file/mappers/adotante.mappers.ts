import { Adotante } from "src/adotantes/domain/adotante";
import { AdotanteEntity } from "../entities/adotante.entity";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-file/mappers/pessoa.mapper"; 
import { AdocaoMapper } from "src/adocoes/infrastructure/persistence/in-file/mappers/adocoes.mapper"; 

export class AdotanteMapper {
  static paraDominio(adotanteEntity: AdotanteEntity): Adotante {
    return new Adotante(
      adotanteEntity.id,
      adotanteEntity.renda,
      adotanteEntity.condicao_entrevista,
      adotanteEntity.pessoa_id,
      PessoaMapper.paraDominio(adotanteEntity.pessoa),
      adotanteEntity.adocao?.map(adocaoEntity => AdocaoMapper.paraDominio(adocaoEntity)) || []
    );
  }

  static paraPersistencia(adotante: Adotante): AdotanteEntity {
    const entity = new AdotanteEntity();
    entity.id = adotante.id;
    entity.renda = adotante.renda;
    entity.condicao_entrevista = adotante.condicao_entrevista;
    entity.pessoa_id = adotante.pessoa_id;
    entity.pessoa = PessoaMapper.paraPersistencia(adotante.pessoa);
    entity.adocao = adotante.adocao?.map(adocao => AdocaoMapper.paraPersistencia(adocao)) || [];
    return entity;
  }
}
