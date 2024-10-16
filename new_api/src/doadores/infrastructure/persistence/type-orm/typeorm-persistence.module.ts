import { Module } from '@nestjs/common';
import { DoadorRepository } from '../../../application/ports/doador.repository';
import { TypeOrmDoadorRepository } from './repositories/doador.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadorEntity } from './entities/doador.entity';
import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { DoadorMapper } from './mappers/doador.mapper';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { TypeOrmPessoaRepository } from 'src/pessoas/infrastructure/persistence/type-orm/repositories/pessoa.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([DoacaoEntity, PessoaEntity, DoadorEntity]),
    PessoasModule
  ],
  providers: [
    {
      provide: DoadorRepository,
      useClass: TypeOrmDoadorRepository,
    },
    {
      provide: PessoaRepository, 
      useClass: TypeOrmPessoaRepository,
    },
    DoadorMapper,
  ],
  exports: [DoadorRepository, TypeOrmModule],
})
export class TypeOrmDoadorPersistenceModule {}