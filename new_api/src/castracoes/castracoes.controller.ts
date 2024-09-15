import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CastracoesService } from './castracoes.service';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';

@Controller('castracoes')
export class CastracoesController {
  constructor(private readonly castracoesService: CastracoesService) {}

  @Post()
  create(@Body() createCastracoeDto: CreateCastracaoDto) {
    return this.castracoesService.create(createCastracoeDto);
  }

  @Get()
  findAll() {
    return this.castracoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.castracoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCastracaoDto: UpdateCastracaoDto) {
    return this.castracoesService.update(+id, updateCastracaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.castracoesService.remove(+id);
  }
}
