import { Module } from '@nestjs/common';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { InMemoryDoadorRepository } from './repositories/doador.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: DoadorRepository,
      useClass: InMemoryDoadorRepository, 
    },
  ],
  exports: [DoadorRepository],
})
export class InMemoryDoadorPersistenceModule {}