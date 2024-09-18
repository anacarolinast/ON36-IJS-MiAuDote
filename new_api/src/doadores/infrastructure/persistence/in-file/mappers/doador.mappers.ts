import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";


export class DoadorMapper {
  static paraDominio(doadorEntity: DoadorEntity): Doador {
    const model = new Doador(
      doadorEntity.id,
      doadorEntity.tipo_doacao,
      doadorEntity.descricao,
      doadorEntity.pessoa_id,
      // doadorEntity.pessoa
      // doadorEntity.doacao
    );
    return model;
  }

  static paraPersistencia(doador: Doador): DoadorEntity {
    const entity = new DoadorEntity();
    entity.id = doador.id;
    entity.tipo_doacao = doador.tipo_doacao;
    entity.descricao = doador.descricao;
    entity.pessoa_id = doador.pessoa_id;
    // entity.gasto = doador.pessoa;
    // entity.doador = doador.doacao;
    return entity;
  }
}
