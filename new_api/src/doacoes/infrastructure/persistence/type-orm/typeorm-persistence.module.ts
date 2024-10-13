import { Module } from '@nestjs/common';
import { DoacaoRepository } from '../../../application/ports/doacao.repository';
import { TypeOrmDoacaoRepository } from './repositories/doacao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { DoacaoEntity } from './entities/doacao.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity'
import { DoacaoMapper } from './mappers/doacao.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, DoacaoEntity])
  ],
  providers: [
    {
      provide: DoacaoRepository,
      useClass: TypeOrmDoacaoRepository,
    },
    DoacaoMapper,
  ],
  exports: [DoacaoRepository, TypeOrmModule],
})
export class TypeOrmDoacaoPersistenceModule {}