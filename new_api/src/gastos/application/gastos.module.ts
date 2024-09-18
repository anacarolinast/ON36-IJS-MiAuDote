import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosService } from './gastos.service';
import { GastosController } from '../presenters/http/gastos.controller';
import { Gasto } from '../domain/gastos'; 

@Module({
  imports: [TypeOrmModule.forFeature([Gasto])],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
