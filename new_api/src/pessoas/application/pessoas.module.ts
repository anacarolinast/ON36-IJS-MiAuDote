import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasService } from './pessoas.service'; 
import { PessoasController } from '../presenters/http/pessoas.controller';  
import { PessoaRepository } from './ports/pessoas.repository';
import { InFilePessoaRepository } from '../infrastructure/persistence/in-file/repositories/pessoa.repository';
import { PessoaFactory } from '../domain/factories/pessoas-factory';

@Module({
  controllers: [PessoasController],
  providers: [
    PessoasService, 
    PessoaFactory,
    { provide: PessoaRepository, useClass: InFilePessoaRepository },
  ],
})
export class PessoasModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: PessoasModule,
      imports: [infrastructureModule],
    };
  }
}