import { DynamicModule, Module } from '@nestjs/common';
import { CepService } from './adapters/cep-adapter.service';
import { HttpModule } from '@nestjs/axios';
import { InFilePessoaPersistenceModule } from './persistence/in-file/in-file-persistence.module';
import { TypeOrmPessoaPersistenceModule } from './persistence/type-orm/typeorm-persistence.module';

@Module({
  imports: [HttpModule],
  providers: [CepService],
  exports: [CepService],
})
export class PessoaInfrastructureModule {
  static use(driver: 'in-file' | 'typeorm'): DynamicModule {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmPessoaPersistenceModule;
    } else if (driver === 'in-file') {
      persistenceModule = InFilePessoaPersistenceModule; 
    } else {
      throw new Error(`Unsupported driver: ${driver}. Only 'typeorm' and 'in-file' are allowed.`);
    }
    return {
      module: PessoaInfrastructureModule,
      imports: [persistenceModule, HttpModule],
      providers: [CepService],
      exports: [persistenceModule, CepService],
    };
  }
}
