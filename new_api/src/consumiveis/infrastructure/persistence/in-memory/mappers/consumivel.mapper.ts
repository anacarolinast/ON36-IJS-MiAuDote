import { Consumivel } from "src/consumiveis/domain/consumivel";
import { ConsumivelEntity } from "../entities/consumivel.entity";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-memory/mappers/gasto.mapper";


export class ConsumivelMapper {
  static paraDominio(consumivelEntity: ConsumivelEntity): Consumivel {
    const model = new Consumivel(
      consumivelEntity.id,
      consumivelEntity.tipo_animal,
      consumivelEntity.descricao,
      consumivelEntity.gasto_id,
      GastoMapper.paraDominio(consumivelEntity.gastos),
    );
    return model;
  }

  static paraPersistencia(consumivel: Consumivel): ConsumivelEntity {
    const entity = new ConsumivelEntity();
    entity.id = consumivel.id;
    entity.tipo_animal = consumivel.tipo_animal;
    entity.descricao = consumivel.descricao;
    entity.gasto_id = consumivel.gasto_id;
    entity.gastos = GastoMapper.paraPersistencia(consumivel.gasto);
    return entity;
  }
}
