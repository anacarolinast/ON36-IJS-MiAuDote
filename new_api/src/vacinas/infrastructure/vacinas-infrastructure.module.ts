import { DynamicModule, Module } from '@nestjs/common';
import { InFileVacinaPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmVacinaPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class VacinaInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmVacinaPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileVacinaPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: VacinaInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
