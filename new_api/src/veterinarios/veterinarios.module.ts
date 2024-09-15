import { Module } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service';
import { VeterinariosController } from './veterinarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinario } from './entities/veterinario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  controllers: [VeterinariosController],
  providers: [VeterinariosService],
})
export class VeterinariosModule {}
