import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PessoasService } from 'src/pessoas/application/pessoas.service'; 

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Get()
  async findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoasService.remove(id);
  }
}
