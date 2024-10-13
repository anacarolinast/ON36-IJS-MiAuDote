import { Module } from '@nestjs/common';
import { AdocaoRepository } from '../../../application/ports/adocoes.repository';
import { TypeOrmAdocaoRepository } from './repositories/adocao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { AdocaoEntity } from './entities/adocao.entity';
import { AnimalEntity } from '../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity'
import { AdotanteEntity } from '../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity'
import { AdocaoMapper } from './mappers/adocao.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, AnimalEntity, AdotanteEntity])
  ],
  providers: [
    {
      provide: AdocaoRepository,
      useClass: TypeOrmAdocaoRepository,
    },
    AdocaoMapper,
  ],
  exports: [AdocaoRepository, TypeOrmModule],
})
export class TypeOrmAdocaoPersistenceModule {}