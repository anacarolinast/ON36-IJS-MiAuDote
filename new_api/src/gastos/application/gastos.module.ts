import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosService } from './gastos.service';
import { GastosController } from '../presenters/http/gastos.controller';
import { Gasto } from '../domain/gastos'; 
import { GastoFactory } from '../domain/factories/gastos-factory';
import { InFileGastoRepository } from '../infrastructure/persistence/in-file/repositories/gasto.repository';
import { GastoRepository } from './ports/gasto.repository';

@Module({
  controllers: [GastosController],
  providers: [
    GastosService,
    GastoFactory,
    { provide: GastoRepository, useClass: InFileGastoRepository },
  ],
})
export class GastosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: GastosModule,
      imports: [infrastructureModule],
    };
  }
}