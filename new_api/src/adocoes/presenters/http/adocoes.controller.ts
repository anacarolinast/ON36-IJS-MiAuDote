import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  ParseIntPipe,
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

  @Post(':adotante_id/:animal_id')
async create(
  @Param('adotante_id', ParseIntPipe) adotante_id: number,
  @Param('animal_id', ParseIntPipe) animal_id: number,
  @Body() createAdocaoDto: CreateAdocaoDto,
): Promise<Adocao> {
  createAdocaoDto.adotante_id = adotante_id;
  createAdocaoDto.animal_id = animal_id;

  // Verificação de existência
  const adotante = await this.adocoesService.verificarAdotante(adotante_id);
  const animal = await this.adocoesService.verificarAnimal(animal_id);

  if (!adotante || !animal) {
    throw new NotFoundException(
      `Adotante ID ${adotante_id} ou Animal ID ${animal_id} não encontrado.`
    );
  }

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