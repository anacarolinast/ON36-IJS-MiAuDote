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
import { AdotantesService } from '../../application/adotantes.service';
import { CreateAdotanteDto } from './dto/create-adotante.dto';
import { UpdateAdotanteDto } from './dto/update-adotante.dto';
import { Adotante } from '../../domain/adotante'; 
import { ApiTags } from '@nestjs/swagger';

@Controller('adotantes')
@ApiTags('Adotantes')
export class AdotantesController {
  constructor(private readonly adotantesService: AdotantesService) {}

  @Get()
  async findAll(): Promise<Adotante[]> {
    return this.adotantesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Adotante> {
    const adotante = await this.adotantesService.findOne(+id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return adotante;
  }

  @Post()
  async create(@Body() createAdotanteDto: CreateAdotanteDto): Promise<Adotante> {
    return this.adotantesService.create(createAdotanteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdotanteDto: UpdateAdotanteDto,
  ): Promise<Adotante> {
    const adotante = await this.adotantesService.findOne(+id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return this.adotantesService.update(+id, updateAdotanteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const adotante = await this.adotantesService.findOne(+id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return this.adotantesService.remove(+id);
  }
}

