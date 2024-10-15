import { Module } from '@nestjs/common';
import { MedicamentoRepository } from '../../../application/ports/medicamento.repository';
import { TypeOrmMedicamentoRepository } from './repositories/medicamento.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoEntity } from './entities/medicamento.entity'; 
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity'; 
import { MedicamentoMapper } from './mappers/medicamento.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([GastoEntity, VeterinarioEntity, AnimalEntity, MedicamentoEntity])
  ],
  providers: [
    {
      provide: MedicamentoRepository,
      useClass: TypeOrmMedicamentoRepository,
    },
    MedicamentoMapper,
  ],
  exports: [MedicamentoRepository, TypeOrmModule],
})
export class TypeOrmMedicamentoPersistenceModule {}