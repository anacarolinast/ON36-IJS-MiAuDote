import { Module } from '@nestjs/common';
import { AdotanteService } from './adotante.service';
import { AdotanteController } from './adotante.controller';

@Module({
  controllers: [AdotanteController],
  providers: [AdotanteService],
})
export class AdotanteModule {}
