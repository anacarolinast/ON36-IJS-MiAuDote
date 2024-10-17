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
import { CastracoesService } from '../../application/castracoes.service';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';
import { Castracao } from '../../domain/castracao'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('castracoes')
@ApiTags('Castrações')
export class CastracoesController {
  constructor(private readonly castracoesService: CastracoesService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de castrações, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Castracao[]> {
    return this.castracoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de castrações com um id específico."})
  async findOne(@Param('id') id: number): Promise<Castracao> {
    const castracao = await this.castracoesService.findOne(+id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return castracao;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em castrações."})
  async create(@Body() createCastracaoDto: CreateCastracaoDto): Promise<Castracao> {
    return this.castracoesService.create(createCastracaoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em castrações."})
  async update(
    @Param('id') id: number,
    @Body() updateCastracaoDto: UpdateCastracaoDto,
  ): Promise<Castracao> {
    const castracao = await this.castracoesService.findOne(+id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return this.castracoesService.update(+id, updateCastracaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em castrações."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const castracao = await this.castracoesService.findOne(+id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return this.castracoesService.remove(+id);
  }
}