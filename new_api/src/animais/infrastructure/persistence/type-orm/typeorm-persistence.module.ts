import { Module } from '@nestjs/common';
import { AnimalRepository } from '../../../application/ports/animais.repository';
import { TypeOrmAnimalRepository } from './repositories/animal.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './entities/animal.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { AnimalMapper } from './mappers/animal.mapper';
import { CastracaoEntity } from 'src/castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from 'src/vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from 'src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { dataSourceOptions } from 'src/database/typeOrm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AnimalEntity, MedicamentoEntity, VacinaEntity, CastracaoEntity, AdocaoEntity])
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