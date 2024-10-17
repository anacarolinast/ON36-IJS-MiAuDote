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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('adotantes')
@ApiTags('Adotantes')
export class AdotantesController {
  constructor(private readonly adotantesService: AdotantesService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de adotantes, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Adotante[]> {
    return this.adotantesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de adotantes com um id específico."})
  async findOne(@Param('id') id: number): Promise<Adotante> {
    const adotante = await this.adotantesService.findOne(+id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return adotante;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em adotantes."})
  async create(@Body() createAdotanteDto: CreateAdotanteDto): Promise<Adotante> {
    return this.adotantesService.create(createAdotanteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em adotantes."})
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
  @ApiOperation({ summary: "Rota responsável por remover um registro em adoções."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const adotante = await this.adotantesService.findOne(+id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return this.adotantesService.remove(+id);
  }
}

