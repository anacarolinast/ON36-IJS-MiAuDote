import { Module } from '@nestjs/common';
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository';
import { InMemoryAdotanteRepository } from './repositories/adotante.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: AdotanteRepository,
      useClass: InMemoryAdotanteRepository, 
    },
  ],
  exports: [AdotanteRepository],
})
export class InMemoryAdotantePersistenceModule {}