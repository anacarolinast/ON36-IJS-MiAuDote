import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimaisService } from './animais.service';
import { AnimaisController } from '../presenters/http/animais.controller';
import { Animal } from '../domain/animal'; 
import { AnimalFactory } from '../domain/factories/animais-factory';
import { AnimalRepository } from './ports/animais.repository';
import { InFileAnimalRepository } from '../infrastructure/persistence/in-file/repositories/animais.repository';

@Module({
  controllers: [AnimaisController],
  providers: [
    AnimaisService,
    AnimalFactory,
    { provide: AnimalRepository, useClass: InFileAnimalRepository },
  ],
  exports: [AnimalRepository],
})
export class AnimaisModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AnimaisModule,
      imports: [infrastructureModule],
    };
  }
}