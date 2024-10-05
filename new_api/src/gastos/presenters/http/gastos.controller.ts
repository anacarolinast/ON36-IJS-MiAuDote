import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GastosService } from 'src/gastos/application/gastos.service';

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


  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.gastosService.remove(id);
  }
}
