import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { PessoasService } from './pessoas.service'; 
import { PessoasController } from '../presenters/http/pessoas.controller';  
import { PessoaRepository } from './ports/pessoas.repository';
import { InFilePessoaRepository } from '../infrastructure/persistence/in-file/repositories/pessoa.repository';
import { PessoaFactory } from '../domain/factories/pessoas-factory';
import { DoadoresModule } from 'src/doadores/application/doadores.module';
import { AdotantesModule } from 'src/adotantes/application/adotantes.module';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { CepService } from '../infrastructure/adapters/cep-adapter.service';
import { HttpModule } from '@nestjs/axios';
import { PessoaInfrastructureModule } from '../infrastructure/pessoas-infrastructure.module';

@Module({
  imports: [
    forwardRef(() => DoadoresModule),
    forwardRef(() => AdotantesModule),
    forwardRef(() => VeterinariosModule),
    PessoaInfrastructureModule.use('in-file'),
  ],
  controllers: [PessoasController],
  providers: [
    PessoasService, 
    PessoaFactory,
    { provide: PessoaRepository, useClass: InFilePessoaRepository },
  ],
  exports: [PessoasService, PessoaRepository, PessoaFactory],
})
export class PessoasModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: PessoasModule,
      imports: [infrastructureModule],
    };
  }
}