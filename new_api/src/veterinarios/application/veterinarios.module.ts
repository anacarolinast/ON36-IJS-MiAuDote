import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service'; 
import { VeterinariosController } from '../presenters/http/veterinarios.controller'; 
import { VeterinarioRepository } from './ports/veterinarios.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module'
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';
import { CastracoesModule } from 'src/castracoes/application/castracoes.module';
import { TypeOrmVeterinarioRepository } from '../infrastructure/persistence/type-orm/repositories/veterinario.repository';
import { PessoaEntity } from 'src/pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { VacinaEntity } from 'src/vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from 'src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { CastracaoEntity } from 'src/castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeterinarioMapper } from '../infrastructure/persistence/type-orm/mappers/veterinario.mapper';
import { VeterinarioEntity } from '../infrastructure/persistence/type-orm/entities/veterinario.entity';

@Module({
  imports: [
    forwardRef(() => PessoasModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => CastracoesModule),
    TypeOrmModule.forFeature([VeterinarioEntity, PessoaEntity, VacinaEntity, MedicamentoEntity, CastracaoEntity]),
  ],
  controllers: [VeterinariosController],
  providers: [
    VeterinariosService,
    VeterinarioMapper,
    { provide: VeterinarioRepository, useClass: TypeOrmVeterinarioRepository }
  ],
  exports: [VeterinariosService, VeterinarioRepository],
})
export class VeterinariosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: VeterinariosModule,
      imports: [infrastructureModule],
    };
  }
}