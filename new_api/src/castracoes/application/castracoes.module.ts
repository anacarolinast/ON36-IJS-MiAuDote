import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from '../presenters/http/castracoes.controller';
import { Castracao } from '../domain/castracao'; 
import { CastracaoFactory } from '../domain/factories/castracoes-factory';
import { CastracaoRepository } from './ports/castracoes.repository';
import { InFileCastracaoRepository } from '../infrastructure/persistence/in-file/repositories/castracao.repository';

@Module({
  controllers: [CastracoesController],
  providers: [
    CastracoesService,
    CastracaoFactory,
    { provide: CastracaoRepository, useClass: InFileCastracaoRepository },
  ],
})
export class CastracoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CastracoesModule,
      imports: [infrastructureModule],
    };
  }
}