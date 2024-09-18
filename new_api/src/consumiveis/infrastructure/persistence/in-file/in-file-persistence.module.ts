import { ConsumivelRepository } from 'src/consumiveis/application/ports/consumiveis.repository';
import { Module } from '@nestjs/common';
import { InFileConsumivelRepository } from './repositories/consumivel.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: ConsumivelRepository,
      useClass: InFileConsumivelRepository,
    },
  ],
  exports: [ConsumivelRepository],
})
export class InFileConsumivelPersistenceModule {}