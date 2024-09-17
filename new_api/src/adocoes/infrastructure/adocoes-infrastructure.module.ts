import { Module } from '@nestjs/common';
import { InMemoryAdocaoPersistenceModule } from './persistence/in-memory/in-file-persistence.module'; 
import { InFileAdocaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class AdocaoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileAdocaoPersistenceModule
        : InMemoryAdocaoPersistenceModule;

    return {
      module: AdocaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}