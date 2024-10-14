import { DynamicModule, Module } from '@nestjs/common';
import { InFileMedicamentoPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmMedicamentoPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class MedicamentoInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmMedicamentoPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileMedicamentoPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }

    return {
      module: MedicamentoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}