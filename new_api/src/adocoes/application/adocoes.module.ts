import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdocoesService } from './adocoes.service';
import { AdocoesController } from '../presenters/http/adocoes.controller';
import { Adocao } from '../domain/adocao'; 

@Module({
  imports: [TypeOrmModule.forFeature([Adocao])],
  controllers: [AdocoesController],
  providers: [AdocoesService],
})
export class AdocoesModule {}
