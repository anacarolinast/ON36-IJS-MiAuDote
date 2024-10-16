import { DynamicModule, forwardRef, Module, Type } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from '../presenters/http/castracoes.controller'; 
import { CastracaoRepository } from './ports/castracoes.repository';
import { VeterinariosModule } from 'src/veterinarios/application/veterinarios.module';
import { AnimaisModule } from 'src/animais/application/animais.module';
import { GastosModule } from 'src/gastos/application/gastos.module';
import { TypeOrmCastracaoRepository } from '../infrastructure/persistence/type-orm/repositories/castracao.repository';
import { CastracaoMapper } from '../infrastructure/persistence/type-orm/mappers/castracao.mapper';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { CastracaoEntity } from '../infrastructure/persistence/type-orm/entities/castracao.entity';

@Module({
  imports: [
    forwardRef(() => VeterinariosModule), 
    forwardRef(() => AnimaisModule), 
    forwardRef(() => GastosModule),
    TypeOrmModule.forFeature([AnimalEntity, VeterinarioEntity, GastoEntity, CastracaoEntity]),
  ],
  controllers: [CastracoesController],
  providers: [
    CastracoesService,
    CastracaoMapper,
    TypeOrmCastracaoRepository,
    { provide: CastracaoRepository, useClass: TypeOrmCastracaoRepository },
  ],
  exports: [CastracaoRepository]
})
export class CastracoesModule {
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CastracoesModule,
      imports: [infrastructureModule],
    };
  }
}