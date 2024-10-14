import { Doacao } from "src/doacoes/domain/doacoes";
import { DoacaoEntity } from "../entities/doacao.entity";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper";

export class DoacaoMapper {
  static paraDominio(doacaoEntity: DoacaoEntity): Doacao {
    const model = new Doacao(
      doacaoEntity.id,
      doacaoEntity.doador_id,
      doacaoEntity.data_doacao,
      doacaoEntity.tipo_doacao,
      doacaoEntity.valor_estimado,
      doacaoEntity.gasto_id,
    );
    return model;
  }

  static paraPersistencia(doacao: Doacao): DoacaoEntity {
    const entity = new DoacaoEntity();
    entity.id = doacao.id;
    entity.doador_id = doacao.doador_id;
    entity.data_doacao = doacao.data_doacao;
    entity.tipo_doacao = doacao.tipo_doacao;
    entity.valor_estimado = doacao.valor_estimado;
    entity.gastos = GastoMapper.paraPersistencia(doacao); 
    return entity;
  }
}
