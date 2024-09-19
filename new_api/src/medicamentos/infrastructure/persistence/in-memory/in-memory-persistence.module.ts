import { MedicamentoRepository } from 'src/medicamentos/application/ports/medicamento.repository';
import { Module } from '@nestjs/common';
import { InMemoryMedicamentoRepository } from './repositories/medicamento.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: MedicamentoRepository,
      useClass: InMemoryMedicamentoRepository,
    },
  ],
  exports: [MedicamentoRepository],
})
export class InMemoryMedicamentoPersistenceModule {}