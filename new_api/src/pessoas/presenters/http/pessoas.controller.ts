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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('pessoas')
@ApiTags('Pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  @ApiResponse({ status: 200, description: 'JSON com todos os registros disponíveis em pessoas.'})
  async findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  @ApiResponse({ status: 200, description: 'JSON com o registro repassado como paramêtro em pessoas.'})
  async findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em pessoas."})
  @ApiResponse({ status: 200, description: 'JSON com o registro atualizado em pessoas.'})
  async update(@Param('id') id: number, @Body() pessoaData: Partial<Pessoa>) {
    return this.pessoasService.update(id, pessoaData);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em pessoas."})
  @ApiResponse({ status: 200, description: 'JSON com o registro removido em pessoas.'})
  async remove(@Param('id') id: number) {
    return this.pessoasService.remove(id);
  }
}
