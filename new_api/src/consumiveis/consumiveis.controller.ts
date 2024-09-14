import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumiveisService } from './consumiveis.service';
import { CreateConsumiveiDto } from './dto/create-consumivei.dto';
import { UpdateConsumiveiDto } from './dto/update-consumivei.dto';

@Controller('consumiveis')
export class ConsumiveisController {
  constructor(private readonly consumiveisService: ConsumiveisService) {}

  @Post()
  create(@Body() createConsumiveiDto: CreateConsumiveiDto) {
    return this.consumiveisService.create(createConsumiveiDto);
  }

  @Get()
  findAll() {
    return this.consumiveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumiveisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumiveiDto: UpdateConsumiveiDto) {
    return this.consumiveisService.update(+id, updateConsumiveiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumiveisService.remove(+id);
  }
}
