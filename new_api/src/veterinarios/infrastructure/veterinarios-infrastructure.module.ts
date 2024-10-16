import { DynamicModule, Module } from '@nestjs/common';
import { InFileVeterinarioPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmVeterinarioPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class VeterinarioInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmVeterinarioPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileVeterinarioPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: VeterinarioInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
