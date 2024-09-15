import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from './consumiveis.controller';
import { Consumivel } from './entities/consumivel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumivel])],
  controllers: [ConsumiveisController],
  providers: [ConsumiveisService],
})
export class ConsumiveisModule {}
