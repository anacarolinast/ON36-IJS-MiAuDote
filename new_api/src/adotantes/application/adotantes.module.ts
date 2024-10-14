import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from '../presenters/http/adotantes.controller';
import { AdotanteRepository } from './ports/adotantes.repository';
import { InFileAdotanteRepository } from '../infrastructure/persistence/in-file/repositories/adotante.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';
import { AdocoesModule } from 'src/adocoes/application/adocoes.module';
import { TypeOrmAdotanteRepository } from '../infrastructure/persistence/type-orm/repositories/adotante.repository';
import { AdotanteMapper } from '../infrastructure/persistence/type-orm/mappers/adotante.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from 'src/pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { AdocaoEntity } from 'src/adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';

@Module({
  imports: [
    forwardRef(() => AdocoesModule), 
    forwardRef(() => PessoasModule),
    TypeOrmModule.forFeature([PessoaEntity]), 
    TypeOrmModule.forFeature([AdocaoEntity]),
  ],
  controllers: [AdotantesController], 
  providers: [
    AdotantesService, 
    AdotanteMapper,
    { provide: AdotanteRepository, useClass: TypeOrmAdotanteRepository },
  ],
  exports: [AdotanteRepository, AdotanteMapper], 
})
export class AdotantesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AdotantesModule,
      imports: [infrastructureModule],
    };
  }
}
