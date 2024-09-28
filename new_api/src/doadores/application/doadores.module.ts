import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from '../presenters/http/doadores.controller';
import { DoadorFactory } from '../domain/factories/doadores-factory';
import { DoadorRepository } from './ports/doador.repository';
import { InFileDoadorRepository } from '../infrastructure/persistence/in-file/repositories/doador.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';

@Module({
  imports: [forwardRef(() => PessoasModule)],
  controllers: [DoadoresController],
  providers: [
    DoadoresService,
    DoadorFactory,
    { provide: DoadorRepository, useClass: InFileDoadorRepository },
  ],
  exports: [DoadorRepository],
})
export class DoadoresModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: DoadoresModule,
      imports: [infrastructureModule],
    };
  }
}