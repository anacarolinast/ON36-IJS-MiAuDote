import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AnimaisService } from '../../application/animais.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../domain/animal'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('animais')
@ApiTags('Animais')
export class AnimaisController {
  constructor(private readonly animaisService: AnimaisService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de animais, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Animal[]> {
    return this.animaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de animais com um id específico."})
  async findOne(@Param('id') id: number) {
    return this.animaisService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em animais."})
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animaisService.create(createAnimalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em animais."})
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animaisService.update(id, updateAnimalDto);
  }

  @ApiOperation({ summary: "Rota responsável por remover um registro em animais."})
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.animaisService.remove(id);
  }
}
