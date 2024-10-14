import { DynamicModule, Module } from '@nestjs/common';
import { InFileDoacaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmDoacaoPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class DoacaoInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmDoacaoPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileDoacaoPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: DoacaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
