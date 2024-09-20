import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdocoesService } from './adocoes.service';
import { AdocoesController } from '../presenters/http/adocoes.controller';
import { Adocao } from '../domain/adocao'; 
import { AdocaoFactory } from '../domain/factories/adocoes-factory';
import { AdocaoRepository } from './ports/adocoes.repository';
import { InFileAdocaoRepository } from '../infrastructure/persistence/in-file/repositories/adocoes.repository';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { AdotantesModule } from 'src/adotantes/application/adotantes.module';

@Module({
  imports: [AnimaisModule, AdotantesModule],
  controllers: [AdocoesController],
  providers: [
    AdocoesService,
    AdocaoFactory,
    { provide: AdocaoRepository, useClass: InFileAdocaoRepository },
  ],
})
export class AdocoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AdocoesModule,
      imports: [infrastructureModule],
    };
  }
}