import { Consumivel } from "src/consumiveis/domain/consumivel";
import { ConsumivelEntity } from "../entities/consumivel.entity";


export class ConsumivelMapper {
  static paraDominio(consumivelEntity: ConsumivelEntity): Consumivel {
    const model = new Consumivel(
      consumivelEntity.id,
      consumivelEntity.tipo_animal,
      consumivelEntity.descricao,
      consumivelEntity.gasto_id,
      // consumivelEntity.gasto
    );
    return model;
  }

  static paraPersistencia(consumivel: Consumivel): ConsumivelEntity {
    const entity = new ConsumivelEntity();
    entity.id = consumivel.id;
    entity.tipo_animal = consumivel.tipo_animal;
    entity.descricao = consumivel.descricao;
    entity.gasto_id = consumivel.gasto_id;
    // entity.gasto = consumivel.gasto;
    return entity;
  }
}
