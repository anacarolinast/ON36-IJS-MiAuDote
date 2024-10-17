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
import { DoacoesService } from '../../application/doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { Doacao } from '../../domain/doacoes'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('doacoes')
@ApiTags('Doações')
export class DoacoesController {
  constructor(private readonly doacoesService: DoacoesService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de doações, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Doacao[]> {
    return this.doacoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de doações com um id específico."})
  async findOne(@Param('id') id: number): Promise<Doacao> {
    const doacao = await this.doacoesService.findOne(+id);
    if (!doacao) {
      throw new NotFoundException(`Doacao with ID ${id} not found`);
    }
    return doacao;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em doações."})
  async create(@Body() createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {
    return this.doacoesService.create(createDoacaoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em doações."})
  async update(
    @Param('id') id: number,
    @Body() updateDoacaoDto: UpdateDoacaoDto,
  ): Promise<Doacao> {
    const doacao = await this.doacoesService.findOne(+id);
    if (!doacao) {
      throw new NotFoundException(`Doacao with ID ${id} not found`);
    }
    return this.doacoesService.update(+id, updateDoacaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em doações."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const doacao = await this.doacoesService.findOne(+id);
    if (!doacao) {
      throw new NotFoundException(`Doacao with ID ${id} not found`);
    }
    return this.doacoesService.remove(+id);
  }
}