import { Gasto } from "src/gastos/domain/gastos";
import { GastoEntity } from "../entities/gasto.entity";


export class GastoMapper {
  static paraDominio(gastoEntity: GastoEntity): Gasto {
    const model = new Gasto(
      gastoEntity.id,
      gastoEntity.data_gasto,
      gastoEntity.tipo,
      gastoEntity.quantidade,
      gastoEntity.valor,
    );
    console.log('Mapping GastoEntity to Gasto:', gastoEntity);
    return model;
  }

  static paraPersistencia(gasto: Gasto): GastoEntity {
    const entity = new GastoEntity();
    entity.id = gasto.id;
    entity.data_gasto = gasto.data_gasto;
    entity.tipo = gasto.tipo;
    entity.quantidade = gasto.quantidade;
    entity.valor = gasto.valor;
    return entity;
  }
}
