import { PessoaEntity } from './../../pessoas/infrastructure/persistence/in-file/entities/pessoa.entity';
import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from '../presenters/http/doadores.controller';
import { DoadorRepository } from './ports/doador.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';
import { TypeOrmDoadorRepository } from '../infrastructure/persistence/type-orm/repositories/doador.repository';
import { DoadorMapper } from '../infrastructure/persistence/type-orm/mappers/doador.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacaoEntity } from 'src/doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';

@Module({
  imports: [forwardRef(() => PessoasModule), TypeOrmModule.forFeature([DoacaoEntity]), TypeOrmModule.forFeature([PessoaEntity])],
  controllers: [DoadoresController],
  providers: [
    DoadoresService,
    DoadorMapper,
    { provide: DoadorRepository, useClass: TypeOrmDoadorRepository }
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