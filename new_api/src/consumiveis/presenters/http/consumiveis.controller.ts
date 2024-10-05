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

@Controller('consumiveis')
export class ConsumiveisController {
  constructor(private readonly consumiveisService: ConsumiveisService) {}

  @Get()
  async findAll(): Promise<Consumivel[]> {
    return this.consumiveisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Consumivel> {
    const consumivel = await this.consumiveisService.findOne(+id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return consumivel;
  }

  @Post()
  async create(@Body() createConsumivelDto: CreateConsumivelDto): Promise<Consumivel> {
    return this.consumiveisService.create(createConsumivelDto);
  }

  @Put(':id')
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
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const consumivel = await this.consumiveisService.findOne(+id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return this.consumiveisService.remove(+id);
  }
}