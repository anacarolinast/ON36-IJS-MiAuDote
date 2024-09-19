import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from '../presenters/http/doadores.controller';
import { Doador } from '../domain/doadores'; 
import { DoadorFactory } from '../domain/factories/doadores-factory';
import { DoadorRepository } from './ports/doador.repository';
import { InFileDoadorRepository } from '../infrastructure/persistence/in-file/repositories/doador.repository';

@Module({
  controllers: [DoadoresController],
  providers: [
    DoadoresService,
    DoadorFactory,
    { provide: DoadorRepository, useClass: InFileDoadorRepository },
  ],
})
export class DoadoresModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: DoadoresModule,
      imports: [infrastructureModule],
    };
  }
}