import { DynamicModule, Module } from '@nestjs/common';
import { InFileDoadorPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmDoadorPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class DoadorInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmDoadorPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileDoadorPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: DoadorInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}