import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { AdocoesService } from './adocoes.service';
import { AdocoesController } from '../presenters/http/adocoes.controller';
import { AdocaoFactory } from '../domain/factories/adocoes-factory';
import { AdocaoRepository } from './ports/adocoes.repository';
import { InFileAdocaoRepository } from '../infrastructure/persistence/in-file/repositories/adocoes.repository';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { AdotantesModule } from 'src/adotantes/application/adotantes.module';
import { TypeOrmAdocaoRepository } from '../infrastructure/persistence/type-orm/repositories/adocao.repository';
import { AdocaoMapper } from '../infrastructure/persistence/type-orm/mappers/adocao.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotanteEntity } from 'src/adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';

@Module({
  imports: [forwardRef(() => AnimaisModule), forwardRef(() => AdotantesModule), TypeOrmModule.forFeature([AdotanteEntity]), TypeOrmModule.forFeature([AnimalEntity])],
  controllers: [AdocoesController],
  providers: [
    AdocoesService,
    AdocaoFactory,
    AdocaoMapper,
    { provide: AdocaoRepository, useClass: TypeOrmAdocaoRepository },
  ],
  exports: [AdocoesService, AdocaoRepository, AdocaoMapper],
})
export class AdocoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AdocoesModule,
      imports: [infrastructureModule],
    };
  }
}