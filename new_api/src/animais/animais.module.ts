import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimaisService } from './animais.service';
import { AnimaisController } from './animais.controller';
import { Animal } from './entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimaisController],
  providers: [AnimaisService],
})
export class AnimaisModule {}
