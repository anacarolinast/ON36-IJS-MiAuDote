import { Castracao } from "src/castracoes/domain/castracao";
import { CastracaoEntity } from "../entities/castracao.entity";
import { AnimalMapper } from "src/animais/infrastructure/persistence/in-file/mappers/animais.mapper"; 
import { VeterinarioMapper } from "src/veterinarios/infrastructure/persistence/in-file/mappers/veterinario.mapper";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class CastracaoMapper {
  static paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    const model = new Castracao(
      castracaoEntity.id,
      castracaoEntity.animal_id,
      castracaoEntity.data_castracao,
      castracaoEntity.condicao_pos,
      castracaoEntity.veterinario_id,
      castracaoEntity.gasto_id,
      castracaoEntity.veterinarios ? VeterinarioMapper.paraDominio(castracaoEntity.veterinarios) : undefined,
      AnimalMapper.paraDominio(castracaoEntity.animais),
      castracaoEntity.gastos ? GastoMapper.paraDominio(castracaoEntity.gastos) : undefined,
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
    if (castracao.veterinario) {
      entity.veterinarios = VeterinarioMapper.paraPersistencia(castracao.veterinario);
  }
    entity.animais = AnimalMapper.paraPersistencia(castracao.animal);
    if (castracao.gasto) {
      entity.gastos = GastoMapper.paraPersistencia(castracao.gasto);
  }
    return entity;
  }
}
