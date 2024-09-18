import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DoadoresService } from '../../application/doadores.service';
import { CreateDoadorDto } from './dto/create-doador.dto';
import { UpdateDoadorDto } from './dto/update-doador.dto';

@Controller('doadores')
export class DoadoresController {
  constructor(private readonly doadoresService: DoadoresService) {}

  @Get()
  async findAll() {
    return this.doadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.doadoresService.findOne(id);
  }

  @Post()
  async create(@Body() createDoadorDto: CreateDoadorDto) {
    return this.doadoresService.create(createDoadorDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDoadorDto: UpdateDoadorDto) {
    return this.doadoresService.update(id, updateDoadorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.doadoresService.remove(id);
  }
}
