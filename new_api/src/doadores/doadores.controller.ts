import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoadoresService } from './doadores.service';
import { CreateDoadoreDto } from './dto/create-doadore.dto';
import { UpdateDoadoreDto } from './dto/update-doadore.dto';

@Controller('doadores')
export class DoadoresController {
  constructor(private readonly doadoresService: DoadoresService) {}

  @Post()
  create(@Body() createDoadoreDto: CreateDoadoreDto) {
    return this.doadoresService.create(createDoadoreDto);
  }

  @Get()
  findAll() {
    return this.doadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoadoreDto: UpdateDoadoreDto) {
    return this.doadoresService.update(+id, updateDoadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doadoresService.remove(+id);
  }
}
