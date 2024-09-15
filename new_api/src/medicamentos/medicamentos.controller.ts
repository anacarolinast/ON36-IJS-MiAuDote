import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Get()
  async findAll() {
    return this.medicamentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.medicamentosService.findOne(id);
  }

  @Post()
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto) {
    return this.medicamentosService.create(createMedicamentoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMedicamentoDto: UpdateMedicamentoDto) {
    return this.medicamentosService.update(id, updateMedicamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.medicamentosService.remove(id);
  }
}
