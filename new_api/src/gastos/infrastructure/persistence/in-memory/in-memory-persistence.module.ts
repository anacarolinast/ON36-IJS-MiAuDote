import { Module } from '@nestjs/common';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { InMemoryGastoRepository } from './repositories/gasto.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: GastoRepository,
      useClass: InMemoryGastoRepository, 
    },
  ],
  exports: [GastoRepository],
})
export class InMemoryGastoPersistenceModule {}