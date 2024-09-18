import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository';
import { Module } from '@nestjs/common';
import { InFileAdotanteRepository } from './repositories/adotante.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AdotanteRepository,
      useClass: InFileAdotanteRepository,
    },
  ],
  exports: [AdotanteRepository],
})
export class InFileAdotantePersistenceModule {}