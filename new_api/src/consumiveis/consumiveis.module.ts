import { Module } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { ConsumiveisController } from './consumiveis.controller';

@Module({
  controllers: [ConsumiveisController],
  providers: [ConsumiveisService],
})
export class ConsumiveisModule {}
