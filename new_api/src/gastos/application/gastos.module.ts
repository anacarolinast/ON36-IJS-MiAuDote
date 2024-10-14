import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from '../presenters/http/gastos.controller';
import { GastoFactory } from '../domain/factories/gastos-factory';
import { GastoRepository } from './ports/gasto.repository';
import { ConsumiveisModule } from 'src/consumiveis/application/consumiveis.module';
import { DoacoesModule } from 'src/doacoes/application/doacoes.module';
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';
import { TypeOrmGastoRepository } from '../infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastoMapper } from '../infrastructure/persistence/type-orm/mappers/gasto.mapper';
import { DoacaoEntity } from 'src/doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { ConsumivelEntity } from 'src/consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';
import { VacinaEntity } from 'src/vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from 'src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { CastracaoEntity } from 'src/castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastracoesModule } from 'src/castracoes/application/castracoes.module';

@Module({
  imports: [
    forwardRef(() => ConsumiveisModule),
    forwardRef(() => DoacoesModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => CastracoesModule),
    TypeOrmModule.forFeature([DoacaoEntity]),
    TypeOrmModule.forFeature([ConsumivelEntity]),
    TypeOrmModule.forFeature([VacinaEntity]),
    TypeOrmModule.forFeature([MedicamentoEntity]),
    TypeOrmModule.forFeature([CastracaoEntity]),
  ],
  controllers: [GastosController],
  providers: [
    GastosService,
    GastoFactory,
    GastoMapper,
    { provide: GastoRepository, useClass: TypeOrmGastoRepository }
  ],
  exports: [GastosService, GastoRepository, GastoFactory],
})
export class GastosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: GastosModule,
      imports: [infrastructureModule],
    };
  }
}
