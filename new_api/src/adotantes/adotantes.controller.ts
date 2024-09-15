import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdotantesService } from './adotantes.service';
import { CreateAdotanteDto } from './dto/create-adotante.dto';
import { UpdateAdotanteDto } from './dto/update-adotante.dto';

@Controller('adotantes')
export class AdotantesController {
  constructor(private readonly adotantesService: AdotantesService) {}

  @Get()
  async findAll() {
    return this.adotantesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.adotantesService.findOne(id);
  }

  @Post()
  async create(@Body() createAdotanteDto: CreateAdotanteDto) {
    return this.adotantesService.create(createAdotanteDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAdotanteDto: UpdateAdotanteDto) {
    return this.adotantesService.update(id, updateAdotanteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.adotantesService.remove(id);
  }
}
