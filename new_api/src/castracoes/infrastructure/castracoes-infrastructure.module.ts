import { DynamicModule, Module } from '@nestjs/common';
import { InFileCastracaoPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmCastracaoPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({})
export class CastracaoInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmCastracaoPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFileCastracaoPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }

    return {
      module: CastracaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}