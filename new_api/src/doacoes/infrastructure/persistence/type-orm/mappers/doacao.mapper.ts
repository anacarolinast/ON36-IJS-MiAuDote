import { Injectable } from '@nestjs/common';
import { Doacao } from '../../../../domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { DoadorEntity } from '../../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { Repository } from 'typeorm';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Doador } from '../../../../../doadores/domain/doadores';


@Injectable()
export class DoacaoMapper {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
  ) {}

  paraDominio(doacaoEntity: DoacaoEntity): Doacao {
    const gasto = new Gasto(
        doacaoEntity.gasto.id,
        doacaoEntity.gasto.data_gasto, 
        doacaoEntity.gasto.tipo,
        doacaoEntity.gasto.quantidade,
        doacaoEntity.gasto.valor
      );

      const doador = new Doador(
        doacaoEntity.doador.id,
        doacaoEntity.doador.tipo_doacao, 
        doacaoEntity.doador.descricao
      );

    return new Doacao(
      doacaoEntity.id,
      doacaoEntity.doador_id,
      doacaoEntity.data_doacao,
      doacaoEntity.tipo_doacao,
      doacaoEntity.valor_estimado,
      doacaoEntity.gasto_id
    );
  }

  async paraPersistencia(doacao: Doacao): Promise<DoacaoEntity> {

    const entity = new DoacaoEntity();
    entity.doador_id = doacao.doador_id;
    entity.data_doacao = doacao.data_doacao;
    entity.tipo_doacao = doacao.tipo_doacao;
    entity.valor_estimado = doacao.valor_estimado;
    entity.gasto_id = null;

    return entity;
  }
}
