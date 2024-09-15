import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DoadoresService } from './doadores.service';
import { CreateDoadorDto } from './dto/create-doador.dto';
import { UpdateDoadorDto } from './dto/update-doador.dto';

@Controller('doadores')
export class DoadoresController {
  constructor(private readonly doadoresService: DoadoresService) {}

  @Get()
  async findAll() {
    return await this.doadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.doadoresService.findOne(id);
  }

  @Post()
  async create(@Body() createDoadorDto: CreateDoadorDto) {
    return await this.doadoresService.create(createDoadorDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDoadorDto: UpdateDoadorDto) {
    return await this.doadoresService.update(id, updateDoadorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.doadoresService.remove(id);
  }
}
