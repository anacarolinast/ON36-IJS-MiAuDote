import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Get()
  async findAll() {
    return this.gastosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.gastosService.findOne(id);
  }

  @Post()
  async create(@Body() createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(id, updateGastoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.gastosService.remove(id);
  }
}
