import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

@Controller('consumiveis')
export class ConsumiveisController {
  constructor(private readonly consumiveisService: ConsumiveisService) {}

  @Get()
  async findAll() {
    return this.consumiveisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.consumiveisService.findOne(id);
  }

  @Post()
  async create(@Body() createConsumivelDto: CreateConsumivelDto) {
    return this.consumiveisService.create(createConsumivelDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateConsumivelDto: UpdateConsumivelDto) {
    return this.consumiveisService.update(id, updateConsumivelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.consumiveisService.remove(id);
  }
}
