import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from '../presenters/http/medicamentos.controller';
import { MedicamentoFactory } from '../domain/factories/medicamentos-factory';
import { MedicamentoRepository } from './ports/medicamento.repository';
import { InFileMedicamentoRepository } from '../infrastructure/persistence/in-file/repositories/medicamento.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    forwardRef(() => VeterinariosModule), 
    forwardRef(() => AnimaisModule), 
    forwardRef(() => GastosModule),
  ],
  controllers: [MedicamentosController],
  providers: [
    MedicamentosService,
    MedicamentoFactory,
    { provide: MedicamentoRepository, useClass: InFileMedicamentoRepository },
  ],
  exports: [MedicamentosService, MedicamentoRepository]
})
export class MedicamentosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: MedicamentosModule,
      imports: [infrastructureModule],
    };
  }
}
