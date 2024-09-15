import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

@Controller('consumiveis')
export class ConsumiveisController {
  constructor(private readonly consumiveisService: ConsumiveisService) {}

  @Post()
  create(@Body() createConsumiveiDto: CreateConsumivelDto) {
    return this.consumiveisService.create(createConsumiveiDto);
  }

  @Get()
  findAll() {
    return this.consumiveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.consumiveisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateConsumiveiDto: UpdateConsumivelDto) {
    return this.consumiveisService.update(+id, updateConsumiveiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.consumiveisService.remove(+id);
  }
}
