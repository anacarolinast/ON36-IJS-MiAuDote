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

@Controller('castracoes')
export class CastracoesController {
  constructor(private readonly castracoesService: CastracoesService) {}

  @Get()
  async findAll(): Promise<Castracao[]> {
    return this.castracoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Castracao> {
    const castracao = await this.castracoesService.findOne(+id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return castracao;
  }

  @Post()
  async create(@Body() createCastracaoDto: CreateCastracaoDto): Promise<Castracao> {
    return this.castracoesService.create(createCastracaoDto);
  }

  @Put(':id')
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
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const castracao = await this.castracoesService.findOne(+id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return this.castracoesService.remove(+id);
  }
}