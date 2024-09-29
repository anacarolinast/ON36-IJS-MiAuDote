import { Module } from '@nestjs/common';
import { InFilePessoaPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { InMemoryPessoaPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { CepService } from './adapters/cep-adapter.service';  
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CepService],
  exports: [CepService],
})
export class PessoaInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule =
      driver === 'in-file'
        ? InFilePessoaPersistenceModule
        : InMemoryPessoaPersistenceModule;

    return {
      module: PessoaInfrastructureModule,
      imports: [persistenceModule, HttpModule],
      providers: [CepService],
      exports: [persistenceModule, CepService], 
    };
  }
}