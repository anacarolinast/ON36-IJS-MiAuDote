import { Module } from '@nestjs/common';
import { DoacaoRepository } from '../../../application/ports/doacao.repository';
import { TypeOrmDoacaoRepository } from './repositories/doacao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacaoEntity } from './entities/doacao.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity'
import { DoacaoMapper } from './mappers/doacao.mapper';
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { TypeOrmGastoRepository } from 'src/gastos/infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, DoacaoEntity, DoadorEntity]),
    GastosModule
  ],
  providers: [
    {
      provide: DoacaoRepository,
      useClass: TypeOrmDoacaoRepository,
    },
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    DoacaoMapper,
  ],
  exports: [DoacaoRepository, TypeOrmModule],
})
export class TypeOrmDoacaoPersistenceModule {}