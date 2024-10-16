import { forwardRef, Module } from '@nestjs/common';
import { MedicamentoRepository } from '../../../application/ports/medicamento.repository';
import { TypeOrmMedicamentoRepository } from './repositories/medicamento.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoEntity } from './entities/medicamento.entity'; 
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity'; 
import { MedicamentoMapper } from './mappers/medicamento.mapper';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { TypeOrmGastoRepository } from 'src/gastos/infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, VeterinarioEntity, AnimalEntity, MedicamentoEntity]),
    forwardRef(() => GastosModule)
  ],
  providers: [
    {
      provide: MedicamentoRepository,
      useClass: TypeOrmMedicamentoRepository,
    },
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    MedicamentoMapper,
  ],
  exports: [MedicamentoRepository, TypeOrmModule],
})
export class TypeOrmMedicamentoPersistenceModule {}