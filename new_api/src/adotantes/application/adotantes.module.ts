import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from '../presenters/http/adotantes.controller';
import { Adotante } from '../domain/adotante'; 

@Module({
  imports: [TypeOrmModule.forFeature([Adotante])],
  controllers: [AdotantesController],
  providers: [AdotantesService],
})
export class AdotantesModule {}
