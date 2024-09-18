import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from '../presenters/http/castracoes.controller';
import { Castracao } from '../domain/castracao'; 

@Module({
  imports: [TypeOrmModule.forFeature([Castracao])],
  controllers: [CastracoesController],
  providers: [CastracoesService],
})
export class CastracoesModule {}
