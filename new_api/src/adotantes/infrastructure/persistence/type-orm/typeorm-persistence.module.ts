import { Module } from '@nestjs/common';
import { AdotanteRepository } from '../../../application/ports/adotantes.repository';
import { TypeOrmAdotanteRepository } from './repositories/adotante.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config'; 
import { AdotanteEntity } from './entities/adotante.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { AdotanteMapper } from './mappers/adotante.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, AdotanteEntity])
  ],
  providers: [
    {
      provide: AdotanteRepository,
      useClass: TypeOrmAdotanteRepository,
    },
    AdotanteMapper,
  ],
  exports: [AdotanteRepository, TypeOrmModule],
})
export class TypeOrmAdotantePersistenceModule {}