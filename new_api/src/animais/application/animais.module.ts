import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimaisService } from './animais.service';
import { AnimaisController } from '../presenters/http/animais.controller';
import { Animal } from '../domain/animal'; 

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimaisController],
  providers: [AnimaisService],
})
export class AnimaisModule {}
