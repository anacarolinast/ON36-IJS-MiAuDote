import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from '../presenters/http/medicamentos.controller';
import { Medicamento } from '../domain/medicamentos';
import { MedicamentoFactory } from '../domain/factories/medicamentos-factory';
import { MedicamentoRepository } from './ports/medicamento.repository';
import { InFileMedicamentoRepository } from '../infrastructure/persistence/in-file/repositories/medicamento.repository';

@Module({
  controllers: [MedicamentosController],
  providers: [
    MedicamentosService,
    MedicamentoFactory,
    { provide: MedicamentoRepository, useClass: InFileMedicamentoRepository },
  ],
})
export class MedicamentosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: MedicamentosModule,
      imports: [infrastructureModule],
    };
  }
}
