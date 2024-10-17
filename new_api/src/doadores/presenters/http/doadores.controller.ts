import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { DoadoresService } from '../../application/doadores.service';
import { CreateDoadorDto } from './dto/create-doador.dto';
import { UpdateDoadorDto } from './dto/update-doador.dto';
import { Doador } from 'src/doadores/domain/doadores';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('doadores')
@ApiTags('Doadores')
export class DoadoresController {
  constructor(private readonly doadoresService: DoadoresService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de doadores, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll() {
    return this.doadoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de doadores com um id específico."})
  async findOne(@Param('id') id: number): Promise<Doador> {
    const doador = await this.doadoresService.findOne(+id);
    if(!doador) {
      throw new NotFoundException(`Doador with ID ${id} not found`)
    }
    return doador;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em doadores."})
  async create(@Body() createDoadorDto: CreateDoadorDto) {
    return this.doadoresService.create(createDoadorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em doadores."})
  async update(
    @Param('id') id: number, 
    @Body() updateDoadorDto: UpdateDoadorDto,
  ): Promise<Doador> {
    const doador = await this.doadoresService.findOne(+id);
    if(!doador){
      throw new NotFoundException(`Doador with ID ${id} not found`);
    }
    return this.doadoresService.update(+id, updateDoadorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em doadores."})
  async remove(@Param('id') id: number) : Promise<{deleted: boolean}> {
    const doador = await this.doadoresService.findOne(+id);
    if (!doador) {
      throw new NotFoundException(`Doador with ID ${id} not found`)
    }
    return this.doadoresService.remove(+id);
  }
}
