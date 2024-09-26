import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-memory/mappers/pessoa.mapper"; 
import { DoacaoMapper } from "src/doacoes/infrastructure/persistence/in-memory/mappers/doacao.mappers"; 

export class DoadorMapper {
  static paraDominio(doadorEntity: DoadorEntity): Doador {
    return new Doador(
      doadorEntity.id,
      doadorEntity.tipo_doacao,
      doadorEntity.descricao,
      doadorEntity.pessoa_id,
      PessoaMapper.paraDominio(doadorEntity.pessoa),
      doadorEntity.doacao?.map(doacaoEntity => DoacaoMapper.paraDominio(doacaoEntity)) || []
    )
  }

  static paraPersistencia(doador: Doador): DoadorEntity {
    const entity = new DoadorEntity();
    entity.id = doador.id;
    entity.tipo_doacao = doador.tipo_doacao;
    entity.descricao = doador.descricao;
    entity.pessoa_id = doador.pessoa_id;
    entity.pessoa = PessoaMapper.paraPersistencia(doador.pessoa);
    entity.doacao = doador.doacao?.map(doacao => DoacaoMapper.paraPersistencia(doacao)) || [];
    return entity;
  }
}
