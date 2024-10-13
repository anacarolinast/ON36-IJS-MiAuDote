import { Module } from '@nestjs/common';
import { InMemoryConsumivelPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileConsumivelPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class ConsumivelInfrastructureModule {
  static use(driver: 'typeorm' | 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileConsumivelPersistenceModule
        : InMemoryConsumivelPersistenceModule;

    return {
      module: ConsumivelInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}