import { Module } from '@nestjs/common';
import { CastracaoRepository } from '../../../application/ports/castracoes.repository';
import { TypeOrmCastracaoRepository } from './repositories/castracao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { CastracaoEntity } from './entities/castracao.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { CastracaoMapper } from './mappers/castracao.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, CastracaoEntity])
  ],
  providers: [
    {
      provide: CastracaoRepository,
      useClass: TypeOrmCastracaoRepository,
    },
    CastracaoMapper,
  ],
  exports: [CastracaoRepository, TypeOrmModule],
})
export class TypeOrmCastracaoPersistenceModule {}