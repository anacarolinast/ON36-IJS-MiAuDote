import { Module } from '@nestjs/common';
import { ConsumivelRepository } from '../../../application/ports/consumiveis.repository';
import { TypeOrmConsumivelRepository } from './repositories/consumivel.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumivelEntity } from './entities/consumivel.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity'
import { ConsumivelMapper } from './mappers/consumivel.mapper';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { TypeOrmGastoRepository } from 'src/gastos/infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, ConsumivelEntity]),
    GastosModule
  ],
  providers: [
    {
      provide: ConsumivelRepository,
      useClass: TypeOrmConsumivelRepository,
    },
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    ConsumivelMapper,
  ],
  exports: [ConsumivelRepository, TypeOrmModule],
})
export class TypeOrmConsumivelPersistenceModule {}