import { Module } from '@nestjs/common';
import { CastracaoRepository } from '../../../application/ports/castracoes.repository';
import { TypeOrmCastracaoRepository } from './repositories/castracao.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config'; 
import { CastracaoEntity } from './entities/castracao.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { CastracaoMapper } from './mappers/castracao.mapper';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdocaoEntity, PessoaEntity, CastracaoEntity, AnimalEntity, VeterinarioEntity, GastoEntity])
  ],
  providers: [
    {
      provide: CastracaoRepository,
      useClass: TypeOrmCastracaoRepository,
    },
    CastracaoMapper,
  ],
  exports: [CastracaoRepository, TypeOrmModule],
})
export class TypeOrmCastracaoPersistenceModule {}