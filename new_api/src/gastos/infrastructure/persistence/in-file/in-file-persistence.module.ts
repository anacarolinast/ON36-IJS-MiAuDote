import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Module } from '@nestjs/common';
import { InFileGastoRepository } from './repositories/gasto.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: GastoRepository,
      useClass: InFileGastoRepository,
    },
  ],
  exports: [GastoRepository],
})
export class InFileGastoPersistenceModule {}