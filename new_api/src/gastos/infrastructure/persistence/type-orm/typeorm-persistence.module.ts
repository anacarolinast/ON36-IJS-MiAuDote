import { Module } from '@nestjs/common';
import { GastoRepository } from '../../../application/ports/gasto.repository';
import { TypeOrmGastoRepository } from './repositories/gasto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { GastoEntity } from './entities/gasto.entity';
import { ConsumivelEntity } from '../../../../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';
import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { GastoMapper } from './mappers/gasto.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([DoacaoEntity, ConsumivelEntity, CastracaoEntity, VacinaEntity, MedicamentoEntity, GastoEntity])
  ],
  providers: [
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    GastoMapper,
  ],
  exports: [GastoRepository, TypeOrmModule],
})
export class TypeOrmGastoPersistenceModule {}