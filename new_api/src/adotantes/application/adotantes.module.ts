import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from '../presenters/http/adotantes.controller';
import { AdotanteFactory } from '../domain/factories/adotante-factory';
import { AdotanteRepository } from './ports/adotantes.repository';
import { InFileAdotanteRepository } from '../infrastructure/persistence/in-file/repositories/adotante.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';
import { AdocoesModule } from 'src/adocoes/application/adocoes.module';

@Module({
  imports: [forwardRef(() => AdocoesModule), PessoasModule],
  controllers: [AdotantesController],
  providers: [
    AdotantesService,
    AdotanteFactory,
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
