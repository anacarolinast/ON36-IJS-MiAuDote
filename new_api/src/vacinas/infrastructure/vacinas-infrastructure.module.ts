import { Module } from '@nestjs/common';
import { InFileVacinaPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { InMemoryVacinaPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';

@Module({})
export class VacinaInfrastructureModule {
  static use(driver: 'typeorm' | 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileVacinaPersistenceModule
        : InMemoryVacinaPersistenceModule;

    return {
      module: VacinaInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
