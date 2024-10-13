import { Module } from '@nestjs/common';
import { InMemoryCastracaoPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileCastracaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class CastracaoInfrastructureModule {
  static use(driver: 'typeorm' | 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileCastracaoPersistenceModule
        : InMemoryCastracaoPersistenceModule;

    return {
      module: CastracaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}