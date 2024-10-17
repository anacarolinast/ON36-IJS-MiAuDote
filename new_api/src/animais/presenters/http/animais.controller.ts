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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('animais')
@ApiTags('Animais')
export class AnimaisController {
  constructor(private readonly animaisService: AnimaisService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de animais, proporcionando uma visão abrangente dos dados armazenados."})
  @ApiResponse({ status: 200, description: 'JSON com todos os registros disponíveis em animais.'})
  async findAll(): Promise<Animal[]> {
    return this.animaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de animais com um id específico."})
  @ApiResponse({ status: 200, description: 'JSON com o registro de id repassada como parametro em animais.'})
  async findOne(@Param('id') id: number) {
    return this.animaisService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em animais."})
  @ApiResponse({ status: 200, description: 'JSON com o novo registro em animais.'})
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animaisService.create(createAnimalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em animais."})
  @ApiResponse({ status: 200, description: 'JSON com o registro atualizado em animais.'})
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animaisService.update(id, updateAnimalDto);
  }

  @ApiOperation({ summary: "Rota responsável por remover um registro em animais."})
  @ApiResponse({ status: 200, description: 'JSON com o registro removido em animais.'})
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.animaisService.remove(id);
  }
}
