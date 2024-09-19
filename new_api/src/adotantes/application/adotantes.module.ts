import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from '../presenters/http/adotantes.controller';
import { Adotante } from '../domain/adotante'; 
import { AdotanteFactory } from '../domain/factories/adotante-factory';
import { AdotanteRepository } from './ports/adotantes.repository';
import { InFileAdotanteRepository } from '../infrastructure/persistence/in-file/repositories/adotante.repository';

@Module({
  controllers: [AdotantesController],
  providers: [
    AdotantesService,
    AdotanteFactory,
    { provide: AdotanteRepository, useClass: InFileAdotanteRepository },
  ],
})
export class AdotantesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AdotantesModule,
      imports: [infrastructureModule],
    };
  }
}