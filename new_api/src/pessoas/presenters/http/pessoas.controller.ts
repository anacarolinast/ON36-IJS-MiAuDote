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
import { CreatePessoaDto } from './dto/create-pessoa.dto'; 
import { UpdatePessoaDto } from './dto/update-pessoa.dto'; 

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

  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoasService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoasService.remove(id);
  }
}
