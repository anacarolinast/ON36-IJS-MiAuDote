import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from '../presenters/http/doadores.controller';
import { Doador } from '../domain/doadores'; 

@Module({
  imports: [TypeOrmModule.forFeature([Doador])],
  controllers: [DoadoresController],
  providers: [DoadoresService],
})
export class DoadoresModule {}
