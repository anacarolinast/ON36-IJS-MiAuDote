import { Injectable } from '@nestjs/common';
import { Consumivel } from '../../../../domain/consumivel';
import { ConsumivelEntity } from '../entities/consumivel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { Repository } from 'typeorm';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class ConsumivelMapper {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoEntityRepository: Repository<GastoEntity>
  ) {}

  static paraDominio(consumivelEntity: ConsumivelEntity): Consumivel {
    const gasto = new Gasto(
        consumivelEntity.gasto.id,
        consumivelEntity.gasto.data_gasto, 
        consumivelEntity.gasto.tipo,
        consumivelEntity.gasto.quantidade,
        consumivelEntity.gasto.valor
    );

    return new Consumivel(
      consumivelEntity.id,
      consumivelEntity.tipo_animal,
      consumivelEntity.descricao,
      consumivelEntity.gasto_id
    );
  }

  async paraPersistencia(consumivel: Consumivel): Promise<ConsumivelEntity> {
    const entity = new ConsumivelEntity();
    entity.tipo_animal = consumivel.tipo_animal;
    entity.descricao = consumivel.descricao;

    return entity;
  }
}
