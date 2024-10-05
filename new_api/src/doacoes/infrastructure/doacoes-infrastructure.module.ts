import { Module } from '@nestjs/common';
import { InMemoryDoacaoPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileDoacaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class DoacaoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileDoacaoPersistenceModule
        : InMemoryDoacaoPersistenceModule;

    return {
      module: DoacaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}