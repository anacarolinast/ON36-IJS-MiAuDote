import { Module } from '@nestjs/common';
import { AdocaoRepository } from 'src/adocoes/application/ports/adocoes.repository';
import { InMemoryAdocaoRepository } from './repositories/adocoes.repository'; 

@Module({
  imports: [],
  providers: [
    {
      provide: AdocaoRepository,
      useClass: InMemoryAdocaoRepository, 
    },
  ],
  exports: [AdocaoRepository],
})
export class InMemoryAdocaoPersistenceModule {}