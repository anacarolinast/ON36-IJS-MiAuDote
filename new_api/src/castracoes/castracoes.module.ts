import { Module } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from './castracoes.controller';

@Module({
  controllers: [CastracoesController],
  providers: [CastracoesService],
})
export class CastracoesModule {}
