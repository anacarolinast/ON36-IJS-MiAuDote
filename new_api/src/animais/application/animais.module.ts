import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { AnimaisController } from '../presenters/http/animais.controller';
import { AnimalRepository } from './ports/animais.repository';
import { AnimalFactory } from '../domain/factories/animais-factory';
import { CastracoesModule } from 'src/castracoes/application/castracoes.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { AdocoesModule } from 'src/adocoes/application/adocoes.module';
import { TypeOrmAnimalRepository } from '../infrastructure/persistence/type-orm/repositories/animal.repository';
import { AnimalMapper } from '../infrastructure/persistence/type-orm/mappers/animal.mapper';
import { TypeOrmAnimalPersistenceModule } from '../infrastructure/persistence/type-orm/typeorm-persistence.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    forwardRef(() => CastracoesModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => AdocoesModule),
    TypeOrmAnimalPersistenceModule,
    DatabaseModule,

  ],
  controllers: [AnimaisController],
  providers: [
    AnimaisService,
    AnimalFactory,
    AnimalMapper,
    { provide: AnimalRepository, useClass: TypeOrmAnimalRepository }
  ],
  exports: [AnimaisService, AnimalRepository],
})
export class AnimaisModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AnimaisModule,
      imports: [infrastructureModule],
    };
  }
}
