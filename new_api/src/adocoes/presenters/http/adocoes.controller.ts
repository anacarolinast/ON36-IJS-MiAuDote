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
import { AdocoesService } from '../../application/adocoes.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';
import { Adocao } from '../../domain/adocao';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('adocoes')
@ApiTags('Adoções')
export class AdocoesController {
  constructor(private readonly adocoesService: AdocoesService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de adoções, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Adocao[]> {
    return this.adocoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de adoções com um id específico."})
  async findOne(@Param('id') id: number): Promise<Adocao> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em adoções."})
  async create(@Body() createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    return this.adocoesService.create(createAdocaoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em adoções."})
  async update(
    @Param('id') id: number,
    @Body() updateAdocaoDto: UpdateAdocaoDto,
  ): Promise<Adocao> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return this.adocoesService.update(+id, updateAdocaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em adoções."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return this.adocoesService.remove(+id);
  }
}
