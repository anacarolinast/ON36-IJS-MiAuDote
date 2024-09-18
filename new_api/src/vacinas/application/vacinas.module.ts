import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacinasController } from './vacinas.controller';
import { VacinasService } from '../vacinas.service';
import { Vacina } from '../infrastructure/persistence/in-memory/entities/vacina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacina])],
  controllers: [VacinasController],
  providers: [VacinasService],
})
export class VacinasModule {}
