import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdocoesService } from './adocoes.service';
import { AdocoesController } from './adocoes.controller';
import { Adocao } from './entities/adocao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adocao])],
  controllers: [AdocoesController],
  providers: [AdocoesService],
})
export class AdocoesModule {}
