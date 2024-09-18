import { Module } from '@nestjs/common';
import { DoacaoRepository } from 'src/doacoes/application/ports/doacao.repository';
import { InMemoryDoacaoRepository } from './repositories/doacao.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: DoacaoRepository,
      useClass: InMemoryDoacaoRepository, 
    },
  ],
  exports: [DoacaoRepository],
})
export class InMemoryDoacaoPersistenceModule {}