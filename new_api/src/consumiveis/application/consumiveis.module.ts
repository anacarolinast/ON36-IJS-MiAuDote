import { DynamicModule, Module, Type, forwardRef } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from '../presenters/http/consumiveis.controller'; 
import { ConsumivelRepository } from './ports/consumiveis.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';
import { TypeOrmConsumivelRepository } from '../infrastructure/persistence/type-orm/repositories/consumivel.repository';
import { ConsumivelMapper } from '../infrastructure/persistence/type-orm/mappers/consumivel.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Module({
  imports: [
    forwardRef(() => GastosModule),
    TypeOrmModule.forFeature([GastoEntity])
  ],
  controllers: [ConsumiveisController],
  providers: [
    ConsumiveisService,
    ConsumivelMapper,
    { provide: ConsumivelRepository, useClass: TypeOrmConsumivelRepository }
  ],
  
  exports: [ConsumiveisService, ConsumivelRepository]
})
export class ConsumiveisModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: ConsumiveisModule,
      imports: [infrastructureModule],
    };
  }
}
