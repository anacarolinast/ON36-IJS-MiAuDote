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
import { AdocoesService } from '../../application/adocoes.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';
import { Adocao } from '../../domain/adocao'; 

@Controller('adocoes')
export class AdocoesController {
  constructor(private readonly adocoesService: AdocoesService) {}

  @Get()
  async findAll(): Promise<Adocao[]> {
    return this.adocoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Adocao> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  @Post()
  async create(@Body() createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    return this.adocoesService.create(createAdocaoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdocaoDto: UpdateAdocaoDto,
  ): Promise<Adocao> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return this.adocoesService.update(+id, updateAdocaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    const adocao = await this.adocoesService.findOne(+id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return this.adocoesService.remove(+id);
  }
}