import { CastracaoRepository } from 'src/castracoes/application/ports/castracoes.repository';
import { Module } from '@nestjs/common';
import { InFileCastracaoRepository } from './repositories/castracoes.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: CastracaoRepository,
      useClass: InFileCastracaoRepository,
    },
  ],
  exports: [CastracaoRepository],
})
export class InFileCastracaoPersistenceModule {}