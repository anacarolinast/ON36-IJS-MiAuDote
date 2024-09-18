import { Castracao } from 'src/castracoes/domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';

export class CastracaoMapper {
  static paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    const model = new Castracao(
      castracaoEntity.id,
      castracaoEntity.animal_id,
      castracaoEntity.data_castracao,
      castracaoEntity.condicao_pos,
      castracaoEntity.veterinario_id,
      castracaoEntity.gasto_id,
    //   castracaoEntity.animais,
    //   castracaoEntity.veterinarios,
    //   castracaoEntity.gastos,
    );
    return model;
  }

  static paraPersistencia(castracao: Castracao): CastracaoEntity {
    const entity = new CastracaoEntity();
    entity.id = castracao.id;
    entity.animal_id = castracao.animal_id;
    entity.data_castracao = castracao.data_castracao;
    entity.condicao_pos = castracao.condicao_pos;
    entity.veterinario_id = castracao.veterinario_id;
    entity.gasto_id = castracao.gasto_id;
    // entity.animais = castracao.animais;
    // entity.veterinarios = castracao.veterinarios;
    // entity.gastos = castracao.gastos;
    return entity;
  }
}
