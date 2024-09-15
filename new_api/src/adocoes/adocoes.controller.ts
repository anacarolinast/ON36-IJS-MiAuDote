import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AdocoesService } from './adocoes.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Controller('adocoes')
export class AdocoesController {
  constructor(private readonly adocoesService: AdocoesService) {}

  @Post()
  async create(@Body() createAdocaoDto: CreateAdocaoDto) {
    return this.adocoesService.create(createAdocaoDto);
  }

  @Get()
  async findAll() {
    return this.adocoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.adocoesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAdocaoDto: UpdateAdocaoDto) {
    return this.adocoesService.update(id, updateAdocaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.adocoesService.remove(id);
  }
}
