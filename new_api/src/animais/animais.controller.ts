import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animais')
export class AnimaisController {
  constructor(private readonly animaisService: AnimaisService) {}

  @Get()
  async findAll() {
    return this.animaisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.animaisService.findOne(+id);
  }

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animaisService.create(createAnimalDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animaisService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.animaisService.remove(+id);
  }
}
