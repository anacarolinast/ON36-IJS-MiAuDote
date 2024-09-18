import { Module } from '@nestjs/common';
import { ConsumivelRepository } from 'src/consumiveis/application/ports/consumiveis.repository';
import { InMemoryConsumivelRepository } from './repositories/consumivel.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: ConsumivelRepository,
      useClass: InMemoryConsumivelRepository, 
    },
  ],
  exports: [ConsumivelRepository],
})
export class InMemoryConsumivelPersistenceModule {}