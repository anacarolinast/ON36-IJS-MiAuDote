import { MedicamentoRepository } from 'src/medicamentos/application/ports/medicamento.repository';
import { Module } from '@nestjs/common';
import { InFileMedicamentoRepository } from './repositories/medicamento.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: MedicamentoRepository,
      useClass: InFileMedicamentoRepository,
    },
  ],
  exports: [MedicamentoRepository],
})
export class InFileMedicamentoPersistenceModule {}