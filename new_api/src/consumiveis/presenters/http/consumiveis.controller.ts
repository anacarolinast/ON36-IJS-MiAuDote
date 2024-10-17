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
import { ConsumiveisService } from '../../application/consumiveis.service';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';
import { Consumivel } from '../../domain/consumivel'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('consumiveis')
@ApiTags('Consumiveis')
export class ConsumiveisController {
  constructor(private readonly consumiveisService: ConsumiveisService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por listar todos os registros disponíveis de consumíveis, proporcionando uma visão abrangente dos dados armazenados."})
  async findAll(): Promise<Consumivel[]> {
    return this.consumiveisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por buscar um registro de consumíveis com um id específico."})
  async findOne(@Param('id') id: number): Promise<Consumivel> {
    const consumivel = await this.consumiveisService.findOne(+id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return consumivel;
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em consumíveis."})
  async create(@Body() createConsumivelDto: CreateConsumivelDto): Promise<Consumivel> {
    return this.consumiveisService.create(createConsumivelDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em consumiveis."})
  async update(
    @Param('id') id: number,
    @Body() updateConsumivelDto: UpdateConsumivelDto,
  ): Promise<Consumivel> {
    const consumivel = await this.consumiveisService.findOne(+id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return this.consumiveisService.update(+id, updateConsumivelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em consumiveis."})
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const consumivel = await this.consumiveisService.findOne(+id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return this.consumiveisService.remove(+id);
  }
}