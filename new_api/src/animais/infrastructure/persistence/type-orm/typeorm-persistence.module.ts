import { Module } from '@nestjs/common';
import { AnimalRepository } from '../../../application/ports/animais.repository';
import { TypeOrmAnimalRepository } from './repositories/animal.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { AnimalEntity } from './entities/animal.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { AnimalMapper } from './mappers/animal.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, AnimalEntity])
  ],
  providers: [
    {
      provide: AnimalRepository,
      useClass: TypeOrmAnimalRepository,
    },
    AnimalMapper,
  ],
  exports: [AnimalRepository, TypeOrmModule],
})
export class TypeOrmAnimalPersistenceModule {}