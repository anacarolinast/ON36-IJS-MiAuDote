import { Module } from '@nestjs/common';
import { InMemoryAnimalPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileAnimalPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class AnimalInfrastructureModule {
  static use(driver: 'typeorm' |'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileAnimalPersistenceModule
        : InMemoryAnimalPersistenceModule;

    return {
      module: AnimalInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
