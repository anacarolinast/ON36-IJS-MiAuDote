import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from '../presenters/http/medicamentos.controller';
import { MedicamentoRepository } from './ports/medicamento.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { GastosModule } from 'src/gastos/application/gastos.module';
import { TypeOrmMedicamentoRepository } from '../infrastructure/persistence/type-orm/repositories/medicamento.repository';
import { MedicamentoMapper } from '../infrastructure/persistence/type-orm/mappers/medicamento.mapper';
import { TypeOrmMedicamentoPersistenceModule } from '../infrastructure/persistence/type-orm/typeorm-persistence.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    forwardRef(() => VeterinariosModule), 
    forwardRef(() => AnimaisModule), 
    forwardRef(() => GastosModule),
    TypeOrmMedicamentoPersistenceModule,
    DatabaseModule,
  ],
  controllers: [MedicamentosController],
  providers: [
    MedicamentosService,
    MedicamentoMapper,
    { provide: MedicamentoRepository, useClass: TypeOrmMedicamentoRepository }
  ],
  exports: [MedicamentoRepository]
})
export class MedicamentosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: MedicamentosModule,
      imports: [infrastructureModule],
    };
  }
}
