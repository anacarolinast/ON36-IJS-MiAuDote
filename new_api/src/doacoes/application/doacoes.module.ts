import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from '../presenters/http/doacoes.controller';
import { Doacao } from '../domain/doacoes'; 

@Module({
  imports: [TypeOrmModule.forFeature([Doacao])],
  controllers: [DoacoesController],
  providers: [DoacoesService],
})
export class DoacoesModule {}
