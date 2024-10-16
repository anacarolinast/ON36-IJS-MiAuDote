import { Module, DynamicModule } from '@nestjs/common';
import { InFileGastoPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmGastoPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class GastoInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmGastoPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileGastoPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }

    return {
      module: GastoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
