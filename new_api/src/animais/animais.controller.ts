import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animais')
export class AnimaisController {
  constructor(private readonly animaisService: AnimaisService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animaisService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animaisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animaisService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animaisService.remove(+id);
  }
}
