import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { PessoasService } from '../../../pessoas/application/pessoas.service'; 
import { Pessoa } from 'src/pessoas/domain/pessoas';
import { ApiTags } from '@nestjs/swagger';

@Controller('pessoas')
@ApiTags('Pessoas')
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

  @Put(':id')
  async update(@Param('id') id: number, @Body() pessoaData: Partial<Pessoa>) {
    return this.pessoasService.update(id, pessoaData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoasService.remove(id);
  }
}
