import { Module } from '@nestjs/common';
import { VacinaRepository } from '../../../application/ports/vacinas.repository';
import { TypeOrmVacinaRepository } from './repositories/vacina.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { VacinaEntity } from './entities/vacina.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VacinaMapper } from './mappers/vacina.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([GastoEntity, VeterinarioEntity, AnimalEntity, VacinaEntity])
  ],
  providers: [
    {
      provide: VacinaRepository,
      useClass: TypeOrmVacinaRepository,
    },
    VacinaMapper,
  ],
  exports: [VacinaRepository, TypeOrmModule],
})
export class TypeOrmVacinaPersistenceModule {}