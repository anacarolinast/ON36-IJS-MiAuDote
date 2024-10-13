import { Module } from '@nestjs/common';
import { PessoaRepository } from '../../../application/ports/pessoas.repository';
import { TypeOrmPessoaRepository } from './repositories/pessoa.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { PessoaEntity } from './entities/pessoa.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AdotanteEntity } from '../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { DoadorEntity } from '../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { PessoaMapper } from './mappers/pessoa.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([AdotanteEntity, VeterinarioEntity, DoadorEntity, PessoaEntity])
  ],
  providers: [
    {
      provide: PessoaRepository,
      useClass: TypeOrmPessoaRepository,
    },
    PessoaMapper,
  ],
  exports: [PessoaRepository, TypeOrmModule],
})
export class TypeOrmPessoaPersistenceModule {}