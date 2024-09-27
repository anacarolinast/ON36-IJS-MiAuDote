import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from '../presenters/http/castracoes.controller';
import { Castracao } from '../domain/castracao'; 
import { CastracaoFactory } from '../domain/factories/castracoes-factory';
import { CastracaoRepository } from './ports/castracoes.repository';
import { InFileCastracaoRepository } from '../infrastructure/persistence/in-file/repositories/castracao.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';

@Module({
  imports: [VeterinariosModule, AnimaisModule],
  controllers: [CastracoesController],
  providers: [
    CastracoesService,
    CastracaoFactory,
    { provide: CastracaoRepository, useClass: InFileCastracaoRepository },
  ],
  exports: [CastracaoRepository]
})
export class CastracoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CastracoesModule,
      imports: [infrastructureModule],
    };
  }
}