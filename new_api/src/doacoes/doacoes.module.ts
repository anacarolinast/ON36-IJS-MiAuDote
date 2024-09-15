import { Module } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { DoacoesController } from './doacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doacao } from './entities/doacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doacao])],
  controllers: [DoacoesController],
  providers: [DoacoesService],
})
export class DoacoesModule {}
