import { Module } from '@nestjs/common';
import { VacinaRepository } from '../../../application/ports/vacinas.repository';
import { TypeOrmVacinaRepository } from './repositories/vacina.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacinaEntity } from './entities/vacina.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VacinaMapper } from './mappers/vacina.mapper';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { TypeOrmGastoRepository } from 'src/gastos/infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, VeterinarioEntity, AnimalEntity, VacinaEntity]),
    GastosModule
  ],
  providers: [
    {
      provide: VacinaRepository,
      useClass: TypeOrmVacinaRepository,
    },
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    VacinaMapper,
  ],
  exports: [VacinaRepository, TypeOrmModule],
})
export class TypeOrmVacinaPersistenceModule {}