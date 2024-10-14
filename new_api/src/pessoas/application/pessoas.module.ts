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
import { PessoaInfrastructureModule } from '../infrastructure/pessoas-infrastructure.module';
import { TypeOrmPessoaRepository } from '../infrastructure/persistence/type-orm/repositories/pessoa.repository';
import { PessoaMapper } from '../infrastructure/persistence/type-orm/mappers/pessoa.mapper';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotanteEntity } from 'src/adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/type-orm/entities/doador.entity';

@Module({
  imports: [
    forwardRef(() => DoadoresModule),
    forwardRef(() => AdotantesModule),
    forwardRef(() => VeterinariosModule),
    TypeOrmModule.forFeature([VeterinarioEntity]),
    TypeOrmModule.forFeature([AdotanteEntity]),
    TypeOrmModule.forFeature([DoadorEntity]),
  ],
  controllers: [PessoasController],
  providers: [
    PessoasService, 
    PessoaFactory,
    PessoaMapper,
    { provide: PessoaRepository, useClass: TypeOrmPessoaRepository }
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