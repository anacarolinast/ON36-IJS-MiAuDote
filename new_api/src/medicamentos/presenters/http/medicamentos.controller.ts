import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MedicamentosService } from '../../application/medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Medicamento } from '../../domain/medicamentos'; 

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Get()
  async findAll(): Promise<Medicamento[]> {
    return this.medicamentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentosService.findOne(+id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return medicamento;
  }

  @Post()
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    return this.medicamentosService.create(createMedicamentoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    const medicamento = await this.medicamentosService.findOne(+id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return this.medicamentosService.update(+id, updateMedicamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const medicamento = await this.medicamentosService.findOne(+id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return this.medicamentosService.remove(+id);
  }
}