import { Injectable, NotFoundException } from '@nestjs/common';
import { Castracao } from '../domain/castracao';
import { CreateCastracaoDto } from '../presenters/http/dto/create-castracao.dto';
import { UpdateCastracaoDto } from '../presenters/http/dto/update-castracao.dto';
import { CastracaoFactory } from '../domain/factories/castracoes-factory';
import { CastracaoRepository } from './ports/castracoes.repository';

@Injectable()
export class CastracoesService {
  constructor(
    private readonly castracaoFactory: CastracaoFactory,
    private readonly castracaoRepository: CastracaoRepository,
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
    const newCastracao = this.castracaoFactory.create(createCastracaoDto);
    return this.castracaoRepository.save(newCastracao);
  }

  async update(id: number, updateCastracaoDto: UpdateCastracaoDto): Promise<Castracao> {
    const castracao = await this.findOne(id);

    const updatedCastracaoData = {
      animal_id: updateCastracaoDto.animal_id ?? castracao.animal_id,
      data_castracao: updateCastracaoDto.data_castracao ?? castracao.data_castracao,
      condicao_pos: updateCastracaoDto.condicao_pos ?? castracao.condicao_pos,
      veterinario_id: updateCastracaoDto.veterinario_id ?? castracao.veterinario_id,
      gasto_id: updateCastracaoDto.gasto_id ?? castracao.gasto_id
    };

    const updatedCastracao = this.castracaoFactory.create(updatedCastracaoData);

    await this.castracaoRepository.update(id, updatedCastracao);
    return updatedCastracao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.castracaoRepository.remove(id);
    return { deleted: true };
  }
}
