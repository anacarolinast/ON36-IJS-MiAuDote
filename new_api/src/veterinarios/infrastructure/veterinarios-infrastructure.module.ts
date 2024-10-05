import { Module } from '@nestjs/common';
import { InFileVeterinarioPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { InMemoryVeterinarioPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';

@Module({})
export class VeterinarioInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFileVeterinarioPersistenceModule
        : InMemoryVeterinarioPersistenceModule;

    return {
      module: VeterinarioInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
