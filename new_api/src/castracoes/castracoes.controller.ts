import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';

@Controller('castracoes')
export class CastracoesController {
  constructor(private readonly castracoesService: CastracoesService) {}

  @Get()
  async findAll() {
    return this.castracoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.castracoesService.findOne(id);
  }

  @Post()
  async create(@Body() createCastracaoDto: CreateCastracaoDto) {
    return this.castracoesService.create(createCastracaoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCastracaoDto: UpdateCastracaoDto) {
    return this.castracoesService.update(id, updateCastracaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.castracoesService.remove(id);
  }
}
