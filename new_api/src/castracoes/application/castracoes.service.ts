import { Injectable, NotFoundException } from '@nestjs/common';
import { Castracao } from '../domain/castracao';
import { CreateCastracaoDto } from '../presenters/http/dto/create-castracao.dto';
import { UpdateCastracaoDto } from '../presenters/http/dto/update-castracao.dto';
import { CastracaoFactory } from '../domain/factories/castracoes-factory';
import { CastracaoRepository } from './ports/castracoes.repository';
import { VeterinarioRepository } from 'src/veterinarios/application/ports/veterinarios.repository';

@Injectable()
export class CastracoesService {
  constructor(
    private readonly castracaoFactory: CastracaoFactory,
    private readonly castracaoRepository: CastracaoRepository,
    private readonly veterinarioRepository: VeterinarioRepository,
  ) {}

  async findAll(): Promise<Castracao[]> {
    return this.castracaoRepository.findAll();
  }

  async findOne(id: number): Promise<Castracao> {
    const castracao = await this.castracaoRepository.findById(id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return castracao;
  }

  async create(createCastracaoDto: CreateCastracaoDto): Promise<Castracao> {
    const veterinario = await this.veterinarioRepository.findById(
      createCastracaoDto.veterinario_id,
    );
    if (!veterinario) {
      throw new NotFoundException(
        `Veterinario with ID ${createCastracaoDto.veterinario_id} not found`,
      );
    }
    const newCastracao = this.castracaoFactory.create(createCastracaoDto, veterinario);
    return this.castracaoRepository.save(newCastracao);
  }

  async update(
    id: number, 
    updateCastracaoDto: UpdateCastracaoDto
  ): Promise<Castracao> {
    const castracao = await this.findOne(id);
    const updatedCastracaoData = {
      animal_id: updateCastracaoDto.animal_id ?? castracao.animal_id,
      data_castracao: updateCastracaoDto.data_castracao ?? castracao.data_castracao,
      condicao_pos: updateCastracaoDto.condicao_pos ?? castracao.condicao_pos,
      veterinario_id: updateCastracaoDto.veterinario_id ?? castracao.veterinario_id,
      gasto_id: updateCastracaoDto.gasto_id ?? castracao.gasto_id
    };

    const veterinario = await this.veterinarioRepository.findById(updatedCastracaoData.veterinario_id);
    if (!veterinario){
      throw new NotFoundException(`Veterinario with ID ${updatedCastracaoData.veterinario_id} not found`)
    }

    const updatedCastracao = this.castracaoFactory.create(updatedCastracaoData, veterinario);

    const result = await this.castracaoRepository.update(id, updatedCastracao);
    
    if(!result){
      throw new NotFoundException(`Castração with ID ${id} not found for update.`)
    }

    return updatedCastracao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.castracaoRepository.remove(id);
    return { deleted: true };
  }
}
