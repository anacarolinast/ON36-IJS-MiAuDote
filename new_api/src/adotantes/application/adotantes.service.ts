import { Injectable, NotFoundException } from '@nestjs/common';
import { Adotante } from '../domain/adotante';
import { CreateAdotanteDto } from '../presenters/http/dto/create-adotante.dto';
import { UpdateAdotanteDto } from '../presenters/http/dto/update-adotante.dto';
import { AdotanteFactory } from '../domain/factories/adotante-factory';
import { AdotanteRepository } from './ports/adotantes.repository';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';

@Injectable()
export class AdotantesService {
  constructor(
    private readonly adotanteFactory: AdotanteFactory,
    private readonly adotanteRepository: AdotanteRepository,
    private readonly pessoaRepository: PessoaRepository,
  ) {}

  async findAll(): Promise<Adotante[]> {
    return this.adotanteRepository.findAll();
  }

  async findOne(id: number): Promise<Adotante> {
    const adotante = await this.adotanteRepository.findById(id);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${id} not found`);
    }
    return adotante;
  }

  async create(createAdotanteDto: CreateAdotanteDto): Promise<Adotante> {
    const pessoa = await this.pessoaRepository.findById(
      createAdotanteDto.pessoa_id,
    );
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa with ID ${createAdotanteDto.pessoa_id} not found`,
      );
    }
    const newAdotante = this.adotanteFactory.create(createAdotanteDto, pessoa);
    return this.adotanteRepository.save(newAdotante);
  }

  async update(
    id: number,
    updateAdotanteDto: UpdateAdotanteDto,
  ): Promise<Adotante> {
    const adotante = await this.findOne(id);
    const updatedAdotanteData = {
      renda: updateAdotanteDto.renda ?? adotante.renda,
      condicao_entrevista:
        updateAdotanteDto.condicao_entrevista ?? adotante.condicao_entrevista,
      pessoa_id: updateAdotanteDto.pessoa_id ?? adotante.pessoa_id,
    };
  
    const pessoa = await this.pessoaRepository.findById(updatedAdotanteData.pessoa_id);
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with ID ${updatedAdotanteData.pessoa_id} not found`);
    }
  
    const updatedAdotante = this.adotanteFactory.create(updatedAdotanteData, pessoa);
  
    const result = await this.adotanteRepository.update(id, updatedAdotante);
    if (!result) {
      throw new NotFoundException(`Adotante with ID ${id} not found for update.`);
    }
  
    return updatedAdotante;
  }
  

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.adotanteRepository.remove(id);
    return { deleted: true };
  }
}
