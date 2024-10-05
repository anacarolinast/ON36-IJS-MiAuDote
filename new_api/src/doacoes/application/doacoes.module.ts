import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from '../presenters/http/doacoes.controller';
import { DoacaoRepository } from './ports/doacao.repository';
import { InFileDoacaoRepository } from '../infrastructure/persistence/in-file/repositories/doacao.repository';
import { DoadoresModule } from 'src/doadores/application/doadores.module';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    forwardRef(() => DoadoresModule),
    forwardRef(() => GastosModule),
  ],
  controllers: [DoacoesController],
  providers: [
    DoacoesService,
    { provide: DoacaoRepository, useClass: InFileDoacaoRepository },
  ],
  exports: [DoacoesService, DoacaoRepository]
})
export class DoacoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: DoacoesModule,
      imports: [infrastructureModule],
    };
  }
}
