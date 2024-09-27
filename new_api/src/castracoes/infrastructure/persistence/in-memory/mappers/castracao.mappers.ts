import { Castracao } from "src/castracoes/domain/castracao";
import { CastracaoEntity } from "../entities/castracao.entity";
import { AnimalMapper } from "src/animais/infrastructure/persistence/in-memory/mappers/animais.mapper"; 
import { VeterinarioMapper } from "src/veterinarios/infrastructure/persistence/in-memory/mappers/veterinario.mapper";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-memory/mappers/gasto.mapper"; 

export class CastracaoMapper {
  static paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    const model = new Castracao(
      castracaoEntity.id,
      castracaoEntity.animal_id,
      castracaoEntity.data_castracao,
      castracaoEntity.condicao_pos,
      castracaoEntity.veterinario_id,
      castracaoEntity.gasto_id,
      // AnimalMapper.paraDominio(castracaoEntity.animais),
      VeterinarioMapper.paraDominio(castracaoEntity.veterinarios),
      // GastoMapper.paraDominio(castracaoEntity.gastos),
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
    // entity.animais = AnimalMapper.paraPersistencia(castracao.animal);
    entity.veterinarios = VeterinarioMapper.paraPersistencia(castracao.veterinario);
    // entity.gastos = GastoMapper.paraPersistencia(castracao.gasto);
    return entity;
  }
}
