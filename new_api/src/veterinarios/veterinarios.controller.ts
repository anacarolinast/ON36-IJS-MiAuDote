import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeterinariosService } from './veterinarios.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';

@Controller('veterinarios')
export class VeterinariosController {
  constructor(private readonly veterinariosService: VeterinariosService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinariosService.create(createVeterinarioDto);
  }

  @Get()
  findAll() {
    return this.veterinariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto) {
    return this.veterinariosService.update(+id, updateVeterinarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinariosService.remove(+id);
  }
}
