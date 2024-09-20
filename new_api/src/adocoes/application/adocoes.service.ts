import { Injectable, NotFoundException } from '@nestjs/common';
import { Adocao } from '../domain/adocao';
import { CreateAdocaoDto } from '../presenters/http/dto/create-adocao.dto';
import { UpdateAdocaoDto } from '../presenters/http/dto/update-adocao.dto';
import { AdocaoFactory } from '../domain/factories/adocoes-factory';
import { AdocaoRepository } from './ports/adocoes.repository';
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository'; 
import { AnimalRepository } from 'src/animais/application/ports/animais.repository'; 

@Injectable()
export class AdocoesService {
  constructor(
    private readonly adocaoFactory: AdocaoFactory,
    private readonly adocaoRepository: AdocaoRepository,
    private readonly adotanteRepository: AdotanteRepository, // Adicione o repositório de adotantes
    private readonly animalRepository: AnimalRepository, // Adicione o repositório de animais
  ) {}

  async findAll(): Promise<Adocao[]> {
    return this.adocaoRepository.findAll();
  }

  async findOne(id: number): Promise<Adocao> {
    const adocao = await this.adocaoRepository.findById(id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  async verificarAdotante(adotante_id: number): Promise<boolean> {
    const adotante = await this.adotanteRepository.findById(adotante_id);
    return !!adotante; // Retorna true se o adotante existir, caso contrário false
  }

  async verificarAnimal(animal_id: number): Promise<boolean> {
    const animal = await this.animalRepository.findById(animal_id);
    return !!animal; // Retorna true se o animal existir, caso contrário false
  }

  async create(createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    // Verifica se o adotante e o animal existem
    const adotanteExists = await this.verificarAdotante(createAdocaoDto.adotante_id);
    const animalExists = await this.verificarAnimal(createAdocaoDto.animal_id);

    if (!adotanteExists || !animalExists) {
      throw new NotFoundException(
        `Adotante ID ${createAdocaoDto.adotante_id} ou Animal ID ${createAdocaoDto.animal_id} não encontrado.`
      );
    }

    const newAdocao = this.adocaoFactory.create(createAdocaoDto);
    return this.adocaoRepository.save(await newAdocao);
  }

  async update(id: number, updateAdocaoDto: UpdateAdocaoDto): Promise<Adocao> {
    const adocao = await this.findOne(id);

    const updatedAdocaoData = {
      adotante_id: updateAdocaoDto.adotante_id ?? adocao.adotante_id,
      animal_id: updateAdocaoDto.animal_id ?? adocao.animal_id,
      data_adocao: updateAdocaoDto.data_adocao ?? adocao.data_adocao,
      condicoes_especiais: updateAdocaoDto.condicoes_especiais ?? adocao.condicoes_especiais,
      status_aprovacao: updateAdocaoDto.status_aprovacao ?? adocao.status_aprovacao
    };

    const updatedAdocao = await this.adocaoFactory.create(updatedAdocaoData);

    await this.adocaoRepository.update(id, updatedAdocao);
    return updatedAdocao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.adocaoRepository.remove(id);
    return { deleted: true };
  }
}
