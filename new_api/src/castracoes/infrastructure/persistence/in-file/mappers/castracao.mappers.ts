import { Castracao } from "src/castracoes/domain/castracao";
import { CastracaoEntity } from "../entities/castracao.entity";
import { AnimalMapper } from "src/animais/infrastructure/persistence/in-file/mappers/animais.mapper"; 
import { VeterinarioMapper } from "src/veterinarios/infrastructure/persistence/in-file/mappers/veterinario.mapper";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class CastracaoMapper {
  static paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    const { 
      id, 
      animal_id, 
      data_castracao, 
      condicao_pos, 
      veterinario_id, 
      gasto_id 
    } = castracaoEntity;

    return new Castracao(
      id,
      animal_id,
      data_castracao,
      condicao_pos,
      veterinario_id,
      gasto_id,
    );
  }

  static paraPersistencia(castracao: Castracao): CastracaoEntity {
    const entity = new CastracaoEntity();
    
    entity.id = castracao.id;
    entity.animal_id = castracao.animal_id;
    entity.data_castracao = castracao.data_castracao;
    entity.condicao_pos = castracao.condicao_pos;
    entity.veterinario_id = castracao.veterinario_id;

    entity.gastos = GastoMapper.paraPersistencia(castracao);
    return entity;
  }
}
