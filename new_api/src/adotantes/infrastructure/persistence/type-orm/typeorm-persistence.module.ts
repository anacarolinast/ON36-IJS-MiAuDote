import { Module } from '@nestjs/common';
import { AdotanteRepository } from '../../../application/ports/adotantes.repository';
import { TypeOrmAdotanteRepository } from './repositories/adotante.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotanteEntity } from './entities/adotante.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { AdotanteMapper } from './mappers/adotante.mapper';
import { PessoaRepository } from '../../../../pessoas/application/ports/pessoas.repository'; 
import { TypeOrmPessoaRepository } from '../../../../pessoas/infrastructure/persistence/type-orm/repositories/pessoa.repository'; 
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, AdotanteEntity]),
    PessoasModule,
  ],
  providers: [
    {
      provide: AdotanteRepository,
      useClass: TypeOrmAdotanteRepository,
    },
    {
      provide: PessoaRepository,
      useClass: TypeOrmPessoaRepository,
    },
    AdotanteMapper,
  ],
  exports: [AdotanteRepository, PessoaRepository, TypeOrmModule],
})
export class TypeOrmAdotantePersistenceModule {}
