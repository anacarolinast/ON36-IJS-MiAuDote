import { Module } from '@nestjs/common';
import { InMemoryAdotantePersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileAdotantePersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class AdotanteInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileAdotantePersistenceModule
        : InMemoryAdotantePersistenceModule;

    return {
      module: AdotanteInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}