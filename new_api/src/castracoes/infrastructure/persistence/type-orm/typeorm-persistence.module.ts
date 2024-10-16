import { forwardRef, Module } from '@nestjs/common';
import { CastracaoRepository } from '../../../application/ports/castracoes.repository';
import { TypeOrmCastracaoRepository } from './repositories/castracao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastracaoEntity } from './entities/castracao.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { CastracaoMapper } from './mappers/castracao.mapper';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { TypeOrmGastoRepository } from 'src/gastos/infrastructure/persistence/type-orm/repositories/gasto.repository';
import { GastosModule } from 'src/gastos/application/gastos.module';

@Module({
  imports: [
    forwardRef(() => GastosModule),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, CastracaoEntity, AnimalEntity, VeterinarioEntity, GastoEntity]),
  ],
  providers: [
    {
      provide: CastracaoRepository,
      useClass: TypeOrmCastracaoRepository,
    },
    {
      provide: GastoRepository,
      useClass: TypeOrmGastoRepository,
    },
    CastracaoMapper,
  ],
  exports: [CastracaoRepository, TypeOrmModule],
})
export class TypeOrmCastracaoPersistenceModule {}