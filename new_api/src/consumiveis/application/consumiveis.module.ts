import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from '../presenters/http/consumiveis.controller';
import { Consumivel } from '../domain/consumivel'; 
import { ConsumivelFactory } from '../domain/factories/consumivel-factory';
import { ConsumivelRepository } from './ports/consumiveis.repository';
import { InFileConsumivelRepository } from '../infrastructure/persistence/in-file/repositories/consumivel.repository';

@Module({
  controllers: [ConsumiveisController],
  providers: [
    ConsumiveisService,
    ConsumivelFactory,
    { provide: ConsumivelRepository, useClass: InFileConsumivelRepository },
  ],
})
export class ConsumiveisModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: ConsumiveisModule,
      imports: [infrastructureModule],
    };
  }
}
