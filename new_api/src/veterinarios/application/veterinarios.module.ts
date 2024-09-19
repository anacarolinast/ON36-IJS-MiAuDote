import { DynamicModule, Module, Type } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service'; 
import { VeterinariosController } from '../presenters/http/veterinarios.controller'; 
import { VeterinarioFactory } from '../domain/factories/veterinarios-factory';
import { InFileVeterinarioRepository } from '../infrastructure/persistence/in-file/repositories/veterinario.repository';
import { VeterinarioRepository } from './ports/veterinarios.repository';

@Module({
  controllers: [VeterinariosController],
  providers: [
    VeterinariosService, 
    VeterinarioFactory,
    { provide: VeterinarioRepository, useClass: InFileVeterinarioRepository },
  ],
})
export class VeterinariosModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: VeterinariosModule,
      imports: [infrastructureModule],
    };
  }
}