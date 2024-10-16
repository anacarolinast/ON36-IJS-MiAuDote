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
import { CastracaoEntity } from 'src/castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { AdotanteEntity } from 'src/adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { MedicamentoEntity } from 'src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { VacinaEntity } from 'src/vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { AdocaoEntity } from 'src/adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => CastracoesModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => AdocoesModule),
    TypeOrmModule.forFeature([CastracaoEntity, MedicamentoEntity, VacinaEntity, AdocaoEntity]),
    TypeOrmAnimalPersistenceModule
  ],
  controllers: [AnimaisController],
  providers: [
    AnimaisService,
    AnimalFactory,
    AnimalMapper,
    { provide: AnimalRepository, useClass: TypeOrmAnimalRepository }
  ],
  exports: [AnimaisService, AnimalMapper, AnimalRepository],
})
export class AnimaisModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AnimaisModule,
      imports: [infrastructureModule],
    };
  }
}
