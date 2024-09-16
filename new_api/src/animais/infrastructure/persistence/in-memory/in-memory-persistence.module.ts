import { Module } from '@nestjs/common';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository';
import { InMemoryAnimalRepository } from './repositories/animais.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: AnimalRepository,
      useClass: InMemoryAnimalRepository, 
    },
  ],
  exports: [AnimalRepository],
})
export class InMemoryAnimalPersistenceModule {}