import { Module, forwardRef, DynamicModule, Type } from '@nestjs/common';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from '../presenters/http/doadores.controller';
import { DoadorRepository } from './ports/doador.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';
import { TypeOrmDoadorRepository } from '../infrastructure/persistence/type-orm/repositories/doador.repository';
import { DoadorMapper } from '../infrastructure/persistence/type-orm/mappers/doador.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadorEntity } from '../infrastructure/persistence/type-orm/entities/doador.entity';
import { PessoaEntity } from 'src/pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { DoacaoEntity } from 'src/doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';

@Module({
  imports: [
    forwardRef(() => PessoasModule),
    TypeOrmModule.forFeature([DoadorEntity, PessoaEntity, DoacaoEntity]),
  ],
  controllers: [DoadoresController],
  providers: [
    DoadoresService,
    DoadorMapper,
    TypeOrmDoadorRepository,
    { provide: DoadorRepository, useClass: TypeOrmDoadorRepository },
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
