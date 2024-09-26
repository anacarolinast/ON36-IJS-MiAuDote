import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from '../presenters/http/doacoes.controller';
import { Doacao } from '../domain/doacoes'; 
import { DoacaoFactory } from '../domain/factories/doacoes-factory';
import { DoacaoRepository } from './ports/doacao.repository';
import { InFileDoacaoRepository } from '../infrastructure/persistence/in-file/repositories/doacao.repository';
import { DoadoresModule } from 'src/doadores/application/doadores.module';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [DoadoresModule, GastosModule],
  controllers: [DoacoesController],
  providers: [
    DoacoesService,
    DoacaoFactory,
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
