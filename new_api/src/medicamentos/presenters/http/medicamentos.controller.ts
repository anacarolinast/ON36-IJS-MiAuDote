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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('medicamentos')
@ApiTags('Medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por obter todos os registros disponíveis de medicamentos."})
  async findAll(): Promise<Medicamento[]> {
    return this.medicamentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por obter o registro de medicamento com id especifico."})
  async findOne(@Param('id') id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentosService.findOne(+id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return medicamento;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em medicamentos."})
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    return this.medicamentosService.create(createMedicamentoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em medicamentos."})
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
  @ApiOperation({ summary: "Rota responsável por remover um registro em medicamentos."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const medicamento = await this.medicamentosService.findOne(+id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return this.medicamentosService.remove(+id);
  }
}