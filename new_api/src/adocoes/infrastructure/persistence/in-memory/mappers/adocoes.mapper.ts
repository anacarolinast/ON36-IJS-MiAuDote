import { Adocao } from 'src/adocoes/domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';

export class AdocaoMapper {
  static paraDominio(adocaoEntity: AdocaoEntity): Adocao {
    const model = new Adocao(
      adocaoEntity.id,
      adocaoEntity.adotante_id,
      adocaoEntity.animal_id,
      adocaoEntity.data_adocao,
      adocaoEntity.condicoes_especiais,
      adocaoEntity.status_aprovacao,
    //   adocaoEntity.animais,
    //   adocaoEntity.adotantes
    );
    return model;
  }

  static paraPersistencia(adocao: Adocao): AdocaoEntity {
    const entity = new AdocaoEntity();
    entity.id = adocao.id;
    entity.adotante_id = adocao.adotante_id;
    entity.animal_id = adocao.animal_id;
    entity.data_adocao = adocao.data_adocao;
    entity.condicoes_especiais = adocao.condicoes_especiais;
    entity.status_aprovacao = adocao.status_aprovacao;
    // entity.animais = adocao.animais;
    // entity.adotantes = adocao.adotantes;
    return entity;
  }
}
