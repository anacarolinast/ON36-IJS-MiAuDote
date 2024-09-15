import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdocoesService } from './adocoes.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Controller('adocoes')
export class AdocoesController {
  constructor(private readonly adocoesService: AdocoesService) {}

  @Post()
  create(@Body() createAdocaoDto: CreateAdocaoDto) {
    return this.adocoesService.create(createAdocaoDto);
  }

  @Get()
  findAll() {
    return this.adocoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adocoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdocaoDto: UpdateAdocaoDto) {
    return this.adocoesService.update(+id, updateAdocaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adocoesService.remove(+id);
  }
}
