import { Injectable } from '@nestjs/common';
import { Doador } from '../../../../domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DoacaoEntity } from '../../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';

@Injectable()
export class DoadorMapper {
  constructor(
    @InjectRepository(DoacaoEntity)
    private readonly doacaoRepository: Repository<DoacaoEntity>,
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  static paraDominio(doadorEntity: DoadorEntity): Doador {
    const doacao =
      doadorEntity.doacoes?.map((doacaoEntity) => {
        return new Doacao(
          doacaoEntity.id,
          doacaoEntity.doador_id,
          doacaoEntity.data_doacao,
          doacaoEntity.tipo_doacao,
          doacaoEntity.valor_estimado,
          doacaoEntity.gasto_id,
        );
      }) || [];

    const pessoa = new Pessoa(
      doadorEntity.pessoa.id,
      doadorEntity.pessoa.nome,
      doadorEntity.pessoa.cep,
      doadorEntity.pessoa.endereco,
      doadorEntity.pessoa.telefone,
      doadorEntity.pessoa.email,
      doadorEntity.pessoa.cpf,
    );

    return new Doador(
      doadorEntity.id,
      doadorEntity.tipo_doacao,
      doadorEntity.descricao,
      doacao,
      pessoa.id,
      pessoa.nome,
      pessoa.cep,
      pessoa.endereco,
      pessoa.telefone,
      pessoa.email,
      pessoa.cpf,
    );
  }

  async paraPersistencia(doador: Doador): Promise<DoadorEntity> {
    const entity = new DoadorEntity();
    entity.tipo_doacao = doador.tipo_doacao;
    entity.descricao = doador.descricao;

    return entity;
  }
}
