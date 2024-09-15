import { Module } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CastracoesController } from './castracoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Castracao } from './entities/castracao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Castracao])],
  controllers: [CastracoesController],
  providers: [CastracoesService],
})
export class CastracoesModule {}
