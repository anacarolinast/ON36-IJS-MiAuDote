import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VacinasService } from './vacinas.service';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';

@Controller('vacinas')
export class VacinasController {
  constructor(private readonly vacinasService: VacinasService) {}

  @Get()
  async findAll() {
    return this.vacinasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vacinasService.findOne(id);
  }

  @Post()
  async create(@Body() createVacinaDto: CreateVacinaDto) {
    return this.vacinasService.create(createVacinaDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateVacinaDto: UpdateVacinaDto) {
    return this.vacinasService.update(id, updateVacinaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.vacinasService.remove(id);
  }
}
