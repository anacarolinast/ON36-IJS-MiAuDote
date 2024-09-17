import { AdocaoRepository } from 'src/adocoes/application/ports/adocoes.repository';
import { Module } from '@nestjs/common';
import { InFileAdocaoRepository } from './repositories/adocoes.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AdocaoRepository,
      useClass: InFileAdocaoRepository,
    },
  ],
  exports: [AdocaoRepository],
})
export class InFileAdocaoPersistenceModule {}