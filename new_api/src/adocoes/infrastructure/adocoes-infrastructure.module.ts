import { DynamicModule, Module } from '@nestjs/common';
import { InFileAdocaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmAdocaoPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class AdocaoInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmAdocaoPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileAdocaoPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: AdocaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
