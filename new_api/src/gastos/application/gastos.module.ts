import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from '../presenters/http/gastos.controller';
import { GastoFactory } from '../domain/factories/gastos-factory';
import { InFileGastoRepository } from '../infrastructure/persistence/in-file/repositories/gasto.repository';
import { GastoRepository } from './ports/gasto.repository';
import { ConsumiveisModule } from 'src/consumiveis/application/consumiveis.module';
import { DoacoesModule } from 'src/doacoes/application/doacoes.module';
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';

@Module({
  imports: [
    forwardRef(() => ConsumiveisModule),
    forwardRef(() => DoacoesModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => MedicamentosModule),
  ],
  controllers: [GastosController],
  providers: [
    GastosService,
    GastoFactory,
    { provide: GastoRepository, useClass: InFileGastoRepository },
  ],
  exports: [GastosService, GastoRepository],
})
export class GastosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: GastosModule,
      imports: [infrastructureModule],
    };
  }
}