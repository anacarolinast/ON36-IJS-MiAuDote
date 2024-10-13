import { Module } from '@nestjs/common';
import { ConsumivelRepository } from '../../../application/ports/consumiveis.repository';
import { TypeOrmConsumivelRepository } from './repositories/consumivel.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { ConsumivelEntity } from './entities/consumivel.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity'
import { ConsumivelMapper } from './mappers/consumivel.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, ConsumivelEntity])
  ],
  providers: [
    {
      provide: ConsumivelRepository,
      useClass: TypeOrmConsumivelRepository,
    },
    ConsumivelMapper,
  ],
  exports: [ConsumivelRepository, TypeOrmModule],
})
export class TypeOrmConsumivelPersistenceModule {}