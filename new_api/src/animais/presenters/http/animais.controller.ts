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
import { AnimaisService } from '../../application/animais.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../domain/animal'; 

@Controller('animais')
export class AnimaisController {
  constructor(private readonly animaisService: AnimaisService) {}

  @Get()
  async findAll(): Promise<Animal[]> {
    return this.animaisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Animal> {
    const animal = await this.animaisService.findOne(+id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.animaisService.create(createAnimalDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    const animal = await this.animaisService.findOne(+id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return this.animaisService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const animal = await this.animaisService.findOne(+id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return this.animaisService.remove(+id);
  }
}
