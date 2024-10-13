import { Module } from '@nestjs/common';
import { TypeOrmAdocaoPersistenceModule } from '../infrastructure/persistence/type-orm/typeorm-persistence.module';

@Module({})
export class AdocaoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory' | 'typeorm') {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmAdocaoPersistenceModule;
    } else if (driver === 'in-file' || driver === 'in-memory') {
      throw new Error('Persistencia ainda nao implementada.')
    } else {
      throw new Error('Driver invalido.')
    }
    
    return {
      module: AdocaoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}