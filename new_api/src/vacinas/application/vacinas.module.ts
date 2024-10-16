import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { VacinasController } from '../presenters/http/vacinas.controller'; 
import { VacinasService } from './vacinas.service'; 
import { VacinaRepository } from './ports/vacinas.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { GastosModule } from 'src/gastos/application/gastos.module';
import { TypeOrmVacinaRepository } from '../infrastructure/persistence/type-orm/repositories/vacina.repository';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VacinaMapper } from '../infrastructure/persistence/type-orm/mappers/vacina.mapper';
import { VacinaEntity } from '../infrastructure/persistence/type-orm/entities/vacina.entity';

@Module({
  imports: [
    forwardRef(() => VeterinariosModule), 
    forwardRef(() => AnimaisModule), 
    forwardRef(() => GastosModule),
    TypeOrmModule.forFeature([VeterinarioEntity, AnimalEntity, GastoEntity, VacinaEntity]),

  ],
  controllers: [VacinasController],
  providers: [
    VacinasService,
    VacinaMapper,
    TypeOrmVacinaRepository,
    { provide: VacinaRepository, useClass: TypeOrmVacinaRepository, }
  ],
  exports: [VacinasService, VacinaRepository]
})
export class VacinasModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: VacinasModule,
      imports: [infrastructureModule],
    };
  }
}
