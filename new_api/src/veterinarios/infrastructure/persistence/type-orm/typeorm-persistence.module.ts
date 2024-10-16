import { Module } from '@nestjs/common';
import { VeterinarioRepository } from '../../../application/ports/veterinarios.repository';
import { TypeOrmVeterinarioRepository } from './repositories/veterinario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeterinarioEntity } from './entities/veterinario.entity';
import { VacinaEntity } from '../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { MedicamentoEntity } from '../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { VeterinarioMapper } from './mappers/veterinario.mapper';
import { dataSourceOptions } from 'src/database/typeOrm.config';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { TypeOrmPessoaRepository } from 'src/pessoas/infrastructure/persistence/type-orm/repositories/pessoa.repository';
import { PessoasModule } from 'src/pessoas/application/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([VacinaEntity, VeterinarioEntity, CastracaoEntity, MedicamentoEntity, PessoaEntity, VeterinarioEntity]),
    PessoasModule
  ],
  providers: [
    {
      provide: VeterinarioRepository,
      useClass: TypeOrmVeterinarioRepository,
    },
    {
      provide: PessoaRepository,
      useClass: TypeOrmPessoaRepository,
    },
    VeterinarioMapper,
  ],
  exports: [VeterinarioRepository, TypeOrmModule],
})
export class TypeOrmVeterinarioPersistenceModule {}