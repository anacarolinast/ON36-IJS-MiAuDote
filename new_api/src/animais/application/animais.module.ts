import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { AnimaisController } from '../presenters/http/animais.controller';
import { AnimalRepository } from './ports/animais.repository';
import { InFileAnimalRepository } from '../infrastructure/persistence/in-file/repositories/animais.repository';
import { AnimalFactory } from '../domain/factories/animais-factory';
import { CastracoesModule } from 'src/castracoes/application/castracoes.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { AdocoesModule } from 'src/adocoes/application/adocoes.module';

@Module({
  imports: [
    forwardRef(() => CastracoesModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => AdocoesModule),
  ],
  controllers: [AnimaisController],
  providers: [
    AnimaisService,
    AnimalFactory,
    { provide: AnimalRepository, useClass: InFileAnimalRepository },
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