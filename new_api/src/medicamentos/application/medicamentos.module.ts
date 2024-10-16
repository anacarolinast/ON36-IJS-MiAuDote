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
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoEntity } from '../infrastructure/persistence/type-orm/entities/medicamento.entity';

@Module({
  imports: [
    forwardRef(() => VeterinariosModule), 
    forwardRef(() => AnimaisModule), 
    forwardRef(() => GastosModule),
    TypeOrmModule.forFeature([VeterinarioEntity, AnimalEntity, GastoEntity, MedicamentoEntity])
  ],
  controllers: [MedicamentosController],
  providers: [
    MedicamentosService,
    MedicamentoMapper,
    TypeOrmMedicamentoPersistenceModule,
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
