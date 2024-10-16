import { Consumivel } from "src/consumiveis/domain/consumivel";
import { ConsumivelEntity } from "../entities/consumivel.entity";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper";

export class ConsumivelMapper {
  static paraDominio(consumivelEntity: ConsumivelEntity): Consumivel {
    const { 
      id, 
      tipo_animal, 
      descricao, 
      gasto_id
    } = consumivelEntity;

    return new Consumivel(
      id,
      tipo_animal,
      descricao,
      gasto_id,
    );
  }

  static paraPersistencia(consumivel: Consumivel): ConsumivelEntity {
    const entity = new ConsumivelEntity();
    
    entity.id = consumivel.id;
    entity.tipo_animal = consumivel.tipo_animal;
    entity.descricao = consumivel.descricao;
    entity.gastos = GastoMapper.paraPersistencia(consumivel); 
    
    return entity;
  }
}
