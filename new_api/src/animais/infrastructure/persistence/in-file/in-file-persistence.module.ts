import { AnimalRepository } from 'src/animais/application/ports/animais.repository';
import { Module } from '@nestjs/common';
import { InFileAnimalRepository } from './repositories/animais.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AnimalRepository,
      useClass: InFileAnimalRepository,
    },
  ],
  exports: [AnimalRepository],
})
export class InFileAnimalPersistenceModule {}