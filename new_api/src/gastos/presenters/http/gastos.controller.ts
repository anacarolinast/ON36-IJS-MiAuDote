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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('gastos')
@ApiTags('Gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por obter todos os registros de gastos."})
  async findAll() {
    return this.gastosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por obter dado de um gasto com um id especifico."})
  async findOne(@Param('id') id: number) {
    return this.gastosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um gasto com um id especifico."})
  async update(@Param('id') id: number, @Body() gastoData: Partial<Gasto>) {
    return this.gastosService.update(id, gastoData);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um gasto com um id especifico dos registros."})
  async remove(@Param('id') id: number) {
    return this.gastosService.remove(id);
  }
}
