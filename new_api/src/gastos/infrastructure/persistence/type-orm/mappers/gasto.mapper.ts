import { Injectable } from '@nestjs/common';
import { Gasto } from '../../../../domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumivelEntity } from '../../../../../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';
import { DoacaoEntity } from '../../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { Repository } from 'typeorm';
import { Consumivel } from '../../../../../consumiveis/domain/consumivel';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';

@Injectable()
export class GastoMapper {
  constructor(
    @InjectRepository(CastracaoEntity)
    private readonly castracaoRepository: Repository<CastracaoEntity>,
    @InjectRepository(DoacaoEntity)
    private readonly doacaoRepository: Repository<DoacaoEntity>,
    @InjectRepository(ConsumivelEntity)
    private readonly consumivelRepository: Repository<ConsumivelEntity>,
    @InjectRepository(VacinaEntity)
    private readonly vacinaRepository: Repository<VacinaEntity>,
    @InjectRepository(MedicamentoEntity)
    private readonly medicamentoRepository: Repository<MedicamentoEntity>,
  ) {}

  paraDominio(gastoEntity: GastoEntity): Gasto {

    const castracao = new Castracao(
        gastoEntity.castracao.id,
        gastoEntity.castracao.animal_id,
        gastoEntity.castracao.data_castracao,
        gastoEntity.castracao.condicao_pos,
        gastoEntity.castracao.veterinario_id,
        gastoEntity.castracao.gasto_id,
      );

      const doacao = new Doacao(
        gastoEntity.doacao.id,
        gastoEntity.doacao.doador_id,
        gastoEntity.doacao.data_doacao,
        gastoEntity.doacao.tipo_doacao,
        gastoEntity.doacao.valor_estimado,
        gastoEntity.doacao.gasto_id,
      );

      const consumivel = new Consumivel(
        gastoEntity.consumivel.id,
        gastoEntity.consumivel.tipo_animal,
        gastoEntity.consumivel.descricao,
        gastoEntity.consumivel.gasto_id,
      );

      const vacina = new Vacina(
        gastoEntity.vacina.id,
        gastoEntity.vacina.animal_id,
        gastoEntity.vacina.data_vacinacao,
        gastoEntity.vacina.tipo_vacina,
        gastoEntity.vacina.veterinario_id,
        gastoEntity.vacina.gasto_id,
      );

      const medicamento = new Medicamento(
        gastoEntity.medicamento.id,
        gastoEntity.medicamento.animal_id,
        gastoEntity.medicamento.data_compra,
        gastoEntity.medicamento.descricao,
        gastoEntity.medicamento.veterinario_id,
        gastoEntity.medicamento.gasto_id,
      );

    return new Gasto(
      gastoEntity.id,
      gastoEntity.data_gasto,
      gastoEntity.tipo,
      gastoEntity.quantidade,
      gastoEntity.valor
    );
  }

  async paraPersistencia(gasto: Gasto): Promise<GastoEntity> {

    const entity = new GastoEntity();
    entity.data_gasto = gasto.data_gasto;
    entity.tipo = gasto.tipo;
    entity.quantidade = gasto.quantidade;
    entity.valor = gasto.valor;

    return entity;
  }
}
