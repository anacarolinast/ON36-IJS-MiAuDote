import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadoresService } from './doadores.service';
import { DoadoresController } from './doadores.controller';
import { Doador } from './entities/doador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doador])],
  controllers: [DoadoresController],
  providers: [DoadoresService],
  exports: [DoadoresService],
})
export class DoadoresModule {}
