import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from '../presenters/http/consumiveis.controller';
import { Consumivel } from '../domain/consumivel'; 

@Module({
  imports: [TypeOrmModule.forFeature([Consumivel])],
  controllers: [ConsumiveisController],
  providers: [ConsumiveisService],
})
export class ConsumiveisModule {}
