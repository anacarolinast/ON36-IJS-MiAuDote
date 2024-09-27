import { DynamicModule, Module, Type } from '@nestjs/common';
import { VacinasController } from '../presenters/http/vacinas.controller'; 
import { VacinasService } from './vacinas.service'; 
import { VacinaFactory } from '../domain/factories/vacinas-factory';
import { VacinaRepository } from './ports/vacinas.repository';
import { InFileVacinaRepository } from '../infrastructure/persistence/in-file/repositories/vacina.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [VeterinariosModule, AnimaisModule, GastosModule],
  controllers: [VacinasController],
  providers: [
    VacinasService, 
    VacinaFactory,
    { provide: VacinaRepository, useClass: InFileVacinaRepository },
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
