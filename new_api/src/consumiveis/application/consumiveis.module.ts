import { DynamicModule, Module, Type, forwardRef } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from '../presenters/http/consumiveis.controller'; 
import { ConsumivelFactory } from '../domain/factories/consumivel-factory';
import { ConsumivelRepository } from './ports/consumiveis.repository';
import { InFileConsumivelRepository } from '../infrastructure/persistence/in-file/repositories/consumivel.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    forwardRef(() => GastosModule),
  ],
  controllers: [ConsumiveisController],
  providers: [
    ConsumiveisService,
    ConsumivelFactory,
    { provide: ConsumivelRepository, useClass: InFileConsumivelRepository },
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
