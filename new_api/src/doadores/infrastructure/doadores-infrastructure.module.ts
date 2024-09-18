import { Module } from '@nestjs/common';
import { InMemoryDoadorPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileDoadorPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class DoadorInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileDoadorPersistenceModule
        : InMemoryDoadorPersistenceModule;

    return {
      module: DoadorInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}