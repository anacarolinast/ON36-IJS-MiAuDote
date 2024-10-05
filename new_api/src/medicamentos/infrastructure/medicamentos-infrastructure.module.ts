import { Module } from '@nestjs/common';
import { InMemoryMedicamentoPersistenceModule } from './persistence/in-memory/in-memory-persistence.module'; 
import { InFileMedicamentoPersistenceModule } from './persistence/in-file/in-file-persistence.module';

@Module({})
export class MedicamentoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileMedicamentoPersistenceModule
        : InMemoryMedicamentoPersistenceModule;

    return {
      module: MedicamentoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}