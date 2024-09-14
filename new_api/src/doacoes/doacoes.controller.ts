import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Controller('doacoes')
export class DoacoesController {
  constructor(private readonly doacoesService: DoacoesService) {}

  @Post()
  create(@Body() createDoacaoDto: CreateDoacaoDto) {
    return this.doacoesService.create(createDoacaoDto);
  }

  @Get()
  findAll() {
    return this.doacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacoesService.update(+id, updateDoacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doacoesService.remove(+id);
  }
}
