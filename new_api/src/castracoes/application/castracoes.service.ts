import { Injectable, NotFoundException } from '@nestjs/common';
import { Castracao } from '../domain/castracao';
import { CreateCastracaoDto } from '../presenters/http/dto/create-castracao.dto';
import { UpdateCastracaoDto } from '../presenters/http/dto/update-castracao.dto';
import { CastracaoFactory } from '../domain/factories/castracoes-factory';
import { CastracaoRepository } from './ports/castracoes.repository';
import { VeterinarioRepository } from 'src/veterinarios/application/ports/veterinarios.repository';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';

@Injectable()
export class CastracoesService {
  constructor(
    private readonly castracaoFactory: CastracaoFactory,
    private readonly castracaoRepository: CastracaoRepository,
    private readonly veterinarioRepository: VeterinarioRepository,
    private readonly animalRepository: AnimalRepository,
    private readonly gastoRepository: GastoRepository,
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

    const animal = await this.animalRepository.findById(
      createCastracaoDto.animal_id,
    );

    const gasto = await this.gastoRepository.findById(
      createCastracaoDto.gasto_id,
    );

    if (!veterinario) {
      throw new NotFoundException(
        `Veterinario with ID ${createCastracaoDto.veterinario_id} not found`,
      );
    }

    if (!animal) {
      throw new NotFoundException(
        `Animal with ID ${createCastracaoDto.animal_id} not found`,
      );
    }

    if (!gasto) {
      throw new NotFoundException(
        `Gasto with ID ${createCastracaoDto.gasto_id} not found`,
      );
    }

    const newCastracao = this.castracaoFactory.create(createCastracaoDto, veterinario, animal, gasto);
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

    const animal = await this.animalRepository.findById(updatedCastracaoData.animal_id);
    if (!veterinario){
      throw new NotFoundException(`Animal with ID ${updatedCastracaoData.animal_id} not found`)
    }

    const gasto = await this.gastoRepository.findById(updatedCastracaoData.gasto_id);
    if (!gasto){
      throw new NotFoundException(`Gasto with ID ${updatedCastracaoData.gasto_id} not found`)
    }

    const updatedCastracao = this.castracaoFactory.create(updatedCastracaoData, veterinario, animal, gasto);

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
