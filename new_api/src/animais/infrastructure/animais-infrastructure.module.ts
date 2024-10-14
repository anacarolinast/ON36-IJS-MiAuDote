import { DynamicModule, Module } from '@nestjs/common';
import { InFileAnimalPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmAnimalPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class AnimalInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmAnimalPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileAnimalPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }

    return {
      module: AnimalInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
