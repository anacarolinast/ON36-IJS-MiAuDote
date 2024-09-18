import { DoacaoRepository } from 'src/doacoes/application/ports/doacao.repository';
import { Module } from '@nestjs/common';
import { InFileDoacaoRepository } from './repositories/doacao.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DoacaoRepository,
      useClass: InFileDoacaoRepository,
    },
  ],
  exports: [DoacaoRepository],
})
export class InFileDoacaoPersistenceModule {}