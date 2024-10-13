import { Module } from '@nestjs/common';
import { InMemoryGastoPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileGastoPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class GastoInfrastructureModule {
  static use(driver: 'typeorm' | 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileGastoPersistenceModule
        : InMemoryGastoPersistenceModule;

    return {
      module: GastoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}