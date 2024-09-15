import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Controller('doacoes')
export class DoacoesController {
  constructor(private readonly doacoesService: DoacoesService) {}

  @Get()
  async findAll() {
    return this.doacoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.doacoesService.findOne(id);
  }

  @Post()
  async create(@Body() createDoacaoDto: CreateDoacaoDto) {
    return this.doacoesService.create(createDoacaoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacoesService.update(id, updateDoacaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.doacoesService.remove(id);
  }
}
