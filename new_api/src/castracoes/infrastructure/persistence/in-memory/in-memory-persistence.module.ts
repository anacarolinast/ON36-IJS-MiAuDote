import { Module } from '@nestjs/common';
import { CastracaoRepository } from 'src/castracoes/application/ports/castracoes.repository';
import { InMemoryCastracaoRepository } from './repositories/castracao.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: CastracaoRepository,
      useClass: InMemoryCastracaoRepository, 
    },
  ],
  exports: [CastracaoRepository],
})
export class InMemoryCastracaoPersistenceModule {}