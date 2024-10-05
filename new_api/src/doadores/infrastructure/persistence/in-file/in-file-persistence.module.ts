import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { Module } from '@nestjs/common';
import { InFileDoadorRepository } from './repositories/doador.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DoadorRepository,
      useClass: InFileDoadorRepository,
    },
  ],
  exports: [DoadorRepository],
})
export class InFileDoadorPersistenceModule {}