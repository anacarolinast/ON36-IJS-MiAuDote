import { DynamicModule, Module } from '@nestjs/common';
import { InFileConsumivelPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmConsumivelPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class ConsumivelInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmConsumivelPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileConsumivelPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }

    return {
      module: ConsumivelInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}