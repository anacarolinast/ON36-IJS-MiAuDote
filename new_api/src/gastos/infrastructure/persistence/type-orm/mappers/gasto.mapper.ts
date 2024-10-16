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
  paraDominio(gastoEntity: GastoEntity): Gasto {
    const doacaoId = gastoEntity.doacao ? gastoEntity.doacao.id : undefined;
    const consumivelId = gastoEntity.consumivel ? gastoEntity.consumivel.id : undefined;
    const castracaoId = gastoEntity.castracao ? gastoEntity.castracao.id : undefined;
    const vacinaId = gastoEntity.vacina ? gastoEntity.vacina.id : undefined;
    const medicamentoId = gastoEntity.medicamento ? gastoEntity.medicamento.id : undefined;

    return new Gasto(
      gastoEntity.id,
      gastoEntity.data_gasto,
      gastoEntity.tipo,
      gastoEntity.quantidade,
      gastoEntity.valor,
      doacaoId,
      consumivelId,
      castracaoId,
      vacinaId,
      medicamentoId
    );
  }

  async paraPersistencia(gasto: Gasto): Promise<GastoEntity> {

    const entity = new GastoEntity();
    entity.data_gasto = gasto.data_gasto;
    entity.tipo = gasto.tipo;
    entity.quantidade = gasto.quantidade;
    entity.valor = gasto.valor;

    if (gasto.doacaoId) {
      entity.doacao = { id: gasto.doacaoId } as any;
    }
    if (gasto.consumivelId) {
      entity.consumivel = { id: gasto.consumivelId } as any;
    }
    if (gasto.castracaoId) {
      entity.castracao = { id: gasto.castracaoId } as any;
    }
    if (gasto.vacinaId) {
      entity.vacina = { id: gasto.vacinaId } as any;
    }
    if (gasto.medicamentoId) {
      entity.medicamento = { id: gasto.medicamentoId } as any;
    }
    return entity;
  }
}
