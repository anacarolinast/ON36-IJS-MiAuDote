import { Adotante } from 'src/adotantes/domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';

export class AdotanteMapper {
  static paraDominio(adotanteEntity: AdotanteEntity): Adotante {
    const model = new Adotante(
      adotanteEntity.id,
      adotanteEntity.renda,
      adotanteEntity.condicao_entrevista,
      adotanteEntity.pessoa_id,
    //   adotanteEntity.pessoa,
    //   adotanteEntity.adocao
    );
    return model;
  }

  static paraPersistencia(adotante: Adotante): AdotanteEntity {
    const entity = new AdotanteEntity();
    entity.id = adotante.id;
    entity.renda = adotante.renda;
    entity.condicao_entrevista = adotante.condicao_entrevista;
    entity.pessoa_id = adotante.pessoa_id;
    // entity.pessoa = adotante.pessoa;
    // entity.adocao = adotante.adocao;
    return entity;
  }
}
