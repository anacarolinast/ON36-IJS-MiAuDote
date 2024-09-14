import { Module } from '@nestjs/common';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from './adotantes.controller';

@Module({
  controllers: [AdotantesController],
  providers: [AdotantesService],
})
export class AdotantesModule {}
