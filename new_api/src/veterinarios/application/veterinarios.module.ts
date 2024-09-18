import { Module } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service';
import { VeterinariosController } from '../presenters/http/veterinarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinario } from '../domain/veterinarios';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  controllers: [VeterinariosController],
  providers: [VeterinariosService],
})
export class VeterinariosModule {}
