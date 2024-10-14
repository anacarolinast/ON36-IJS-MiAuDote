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
import { CastracaoEntity } from 'src/castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoEntity } from 'src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { VacinaEntity } from 'src/vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { AdocaoEntity } from 'src/adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { AnimalMapper } from '../infrastructure/persistence/type-orm/mappers/animal.mapper';

@Module({
  imports: [
    forwardRef(() => CastracoesModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => AdocoesModule),
    TypeOrmModule.forFeature([CastracaoEntity]),
    TypeOrmModule.forFeature([MedicamentoEntity]),
    TypeOrmModule.forFeature([AdocaoEntity]),
    TypeOrmModule.forFeature([VacinaEntity])

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
