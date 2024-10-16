import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from '../presenters/http/doacoes.controller';
import { DoacaoRepository } from './ports/doacao.repository';
import { DoadoresModule } from 'src/doadores/application/doadores.module';
import { GastosModule } from 'src/gastos/application/gastos.module';
import { TypeOrmDoacaoRepository } from '../infrastructure/persistence/type-orm/repositories/doacao.repository';
import { DoacaoMapper } from '../infrastructure/persistence/type-orm/mappers/doacao.mapper';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { DoacaoEntity } from '../infrastructure/persistence/type-orm/entities/doacao.entity';

@Module({
  imports: [
    forwardRef(() => DoadoresModule),
    forwardRef(() => GastosModule),
    TypeOrmModule.forFeature([GastoEntity, DoadorEntity, DoacaoEntity]),
  ],
  controllers: [DoacoesController],
  providers: [
    DoacoesService,
    DoacaoMapper,
    TypeOrmDoacaoRepository,
    { provide: DoacaoRepository, useClass: TypeOrmDoacaoRepository }
  ],
  exports: [DoacaoRepository]
})
export class DoacoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: DoacoesModule,
      imports: [infrastructureModule],
    };
  }
}
