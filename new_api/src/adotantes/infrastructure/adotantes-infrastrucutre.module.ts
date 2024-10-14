import { DynamicModule, Module } from '@nestjs/common';
import { InFileAdotantePersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmAdotantePersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class AdotanteInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmAdotantePersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileAdotantePersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    
    return {
      module: AdotanteInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}