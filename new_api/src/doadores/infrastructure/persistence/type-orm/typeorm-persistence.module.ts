import { Module } from '@nestjs/common';
import { DoadorRepository } from '../../../application/ports/doador.repository';
import { TypeOrmDoadorRepository } from './repositories/doador.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeOrm.config';
import { DoadorEntity } from './entities/doador.entity';
import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity'
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'
import { DoadorMapper } from './mappers/doador.mapper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([DoacaoEntity, PessoaEntity, DoadorEntity])
  ],
  providers: [
    {
      provide: DoadorRepository,
      useClass: TypeOrmDoadorRepository,
    },
    DoadorMapper,
  ],
  exports: [DoadorRepository, TypeOrmModule],
})
export class TypeOrmDoadorPersistenceModule {}