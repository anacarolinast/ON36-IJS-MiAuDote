import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-memory/mappers/pessoa.mapper"; 
import { DoacaoMapper } from "src/doacoes/infrastructure/persistence/in-memory/mappers/doacao.mappers"; 

export class DoadorMapper {
  static paraDominio(doadorEntity: DoadorEntity): Doador {
    const { id, tipo_doacao, descricao, pessoa_id, pessoa, doacao } = doadorEntity;

    return new Doador(
      id,
      tipo_doacao,
      descricao,
      doacao?.map(DoacaoMapper.paraDominio) || [],
      pessoa_id,
      pessoa.nome,
      pessoa.cep,
      pessoa.endereco,
      pessoa.telefone,
      pessoa.email,
      pessoa.cpf
    );
  }

  static paraPersistencia(doador: Doador): DoadorEntity {
    const entity = new DoadorEntity();
    entity.id = doador.id;
    entity.tipo_doacao = doador.tipo_doacao;
    entity.descricao = doador.descricao;
    entity.pessoa = PessoaMapper.paraPersistencia(doador); 
    entity.doacao = doador.doacao?.map(doacao => DoacaoMapper.paraPersistencia(doacao)) || [];

    return entity;
  }
}
