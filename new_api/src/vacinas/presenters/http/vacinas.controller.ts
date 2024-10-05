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

@Controller('vacinas')
export class VacinasController {
  constructor(private readonly vacinasService: VacinasService) {}

  @Get()
  async findAll(): Promise<Vacina[]> {
    return this.vacinasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Vacina> {
    const vacina = await this.vacinasService.findOne(+id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return vacina;
  }

  @Post()
  async create(@Body() createVacinaDto: CreateVacinaDto): Promise<Vacina> {
    return this.vacinasService.create(createVacinaDto);
  }

  @Put(':id')
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
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const vacina = await this.vacinasService.findOne(+id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return this.vacinasService.remove(+id);
  }
}