import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from '../presenters/http/adotantes.controller';
import { AdotanteRepository } from './ports/adotantes.repository';
import { InFileAdotanteRepository } from '../infrastructure/persistence/in-file/repositories/adotante.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';
import { AdocoesModule } from 'src/adocoes/application/adocoes.module';

@Module({
  imports: [forwardRef(() => AdocoesModule), forwardRef(() => PessoasModule)],
  controllers: [AdotantesController],
  providers: [
    AdotantesService,
    { provide: AdotanteRepository, useClass: InFileAdotanteRepository },
  ],
  exports: [AdotanteRepository],
})
export class AdotantesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AdotantesModule,
      imports: [infrastructureModule],
    };
  }
}
