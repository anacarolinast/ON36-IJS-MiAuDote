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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('pessoas')
@ApiTags('Pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  async findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  async findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  async update(@Param('id') id: number, @Body() pessoaData: Partial<Pessoa>) {
    return this.pessoasService.update(id, pessoaData);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em pessoas."})
  async remove(@Param('id') id: number) {
    return this.pessoasService.remove(id);
  }
}
