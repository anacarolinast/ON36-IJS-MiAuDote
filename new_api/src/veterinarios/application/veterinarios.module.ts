import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service'; 
import { VeterinariosController } from '../presenters/http/veterinarios.controller'; 
import { VeterinarioFactory } from '../domain/factories/veterinarios-factory';
import { InFileVeterinarioRepository } from '../infrastructure/persistence/in-file/repositories/veterinario.repository';
import { VeterinarioRepository } from './ports/veterinarios.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module'
import { VacinasModule } from 'src/vacinas/application/vacinas.module';
import { MedicamentosModule } from 'src/medicamentos/application/medicamentos.module';
import { CastracoesModule } from 'src/castracoes/application/castracoes.module';

@Module({
  imports: [
    forwardRef(() => PessoasModule),
    forwardRef(() => VacinasModule),
    forwardRef(() => MedicamentosModule),
    forwardRef(() => CastracoesModule),
  ],
  controllers: [VeterinariosController],
  providers: [
    VeterinariosService, 
    VeterinarioFactory,
    { provide: VeterinarioRepository, useClass: InFileVeterinarioRepository },
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