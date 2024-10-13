import { Module } from '@nestjs/common';
import { TypeOrmAdotantePersistenceModule } from '../infrastructure/persistence/type-orm/typeorm-persistence.module';

@Module({})
export class AdotanteInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory' | 'typeorm') {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmAdotantePersistenceModule;
    } else if (driver === 'in-file' || driver === 'in-memory') {
      throw new Error('Persistencia ainda nao implementada.')
    } else {
      throw new Error('Driver invalido.')
    }
    
    return {
      module: AdotanteInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}