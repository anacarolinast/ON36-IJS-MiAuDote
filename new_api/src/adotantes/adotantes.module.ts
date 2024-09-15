import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AdotantesService } from './adotantes.service';
import { AdotantesController } from './adotantes.controller';
import { Adotante } from './entities/adotante.entity'; 

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Adotante]), 
  ],
  controllers: [AdotantesController],
  providers: [AdotantesService],
})
export class AdotantesModule {}
