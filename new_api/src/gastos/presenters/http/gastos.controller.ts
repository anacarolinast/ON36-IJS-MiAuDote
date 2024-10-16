import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { GastosService } from '../../../gastos/application/gastos.service';
import { Gasto } from 'src/gastos/domain/gastos';

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

  @Put(':id')
  async update(@Param('id') id: number, @Body() gastoData: Partial<Gasto>) {
    return this.gastosService.update(id, gastoData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.gastosService.remove(id);
  }
}
