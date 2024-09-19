import { DynamicModule, Module, Type } from '@nestjs/common';
import { VacinasController } from '../presenters/http/vacinas.controller'; 
import { VacinasService } from './vacinas.service'; 
import { VacinaFactory } from '../domain/factories/vacinas-factory';
import { VacinaRepository } from './ports/vacinas.repository';
import { InFileVacinaRepository } from '../infrastructure/persistence/in-file/repositories/vacina.repository';

@Module({
  controllers: [VacinasController],
  providers: [
    VacinasService, 
    VacinaFactory,
    { provide: VacinaRepository, useClass: InFileVacinaRepository },
  ],
})
export class VacinasModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: VacinasModule,
      imports: [infrastructureModule],
    };
  }
}
