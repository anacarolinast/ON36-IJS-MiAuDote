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
import { VacinasService } from '../../application/vacinas.service';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';
import { Vacina } from '../../domain/vacinas'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('vacinas')
@ApiTags('Vacinas')
export class VacinasController {
  constructor(private readonly vacinasService: VacinasService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por obter todos os registros disponivéis para vacinas."})
  async findAll(): Promise<Vacina[]> {
    return this.vacinasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por obter um registro em medicamentos com uma id especifica."})
  async findOne(@Param('id') id: number): Promise<Vacina> {
    const vacina = await this.vacinasService.findOne(+id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return vacina;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em vacinas."})
  async create(@Body() createVacinaDto: CreateVacinaDto): Promise<Vacina> {
    return this.vacinasService.create(createVacinaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em vacinas."})
  async update(
    @Param('id') id: number,
    @Body() updateVacinaDto: UpdateVacinaDto,
  ): Promise<Vacina> {
    const vacina = await this.vacinasService.findOne(+id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return this.vacinasService.update(+id, updateVacinaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em vacinas."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const vacina = await this.vacinasService.findOne(+id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return this.vacinasService.remove(+id);
  }
}