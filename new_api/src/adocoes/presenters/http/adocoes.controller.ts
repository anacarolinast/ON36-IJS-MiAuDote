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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('adocoes')
@ApiTags('Adoções')
export class AdocoesController {
  constructor(private readonly adocoesService: AdocoesService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de adoções, proporcionando uma visão abrangente dos dados armazenados."})
  @ApiResponse({ status: 200, description: 'JSON com todos os registros de adoções'})
  async findAll(): Promise<Adocao[]> {
    return this.adocoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de adoções com um id específico."})
  @ApiResponse({ status: 200, description: 'JSON com um registro de adoção, com a id repassada como parâmetro.'})
  async findOne(@Param('id') id: number): Promise<Adocao> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em adoções."})
  @ApiResponse({ status: 200, description: 'JSON com um registro criado.'})
  async create(@Body() createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    return this.adocoesService.create(createAdocaoDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'JSON com um registro atualizado.'})
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
  @ApiResponse({ status: 200, description: 'JSON com um registro deletado.'})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return this.adocoesService.remove(+id);
  }
}
